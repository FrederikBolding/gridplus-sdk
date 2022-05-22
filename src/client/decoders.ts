import { sha256 } from 'hash.js';
import { Constants } from '..';
import bitcoin from '../bitcoin';
import {
  ADDR_STR_LEN,
  CURRENCIES,
  decResLengths,
  messageConstants,
} from '../constants';
import ethereum from '../ethereum';
import { parseGenericSigningResponse } from '../genericSigning';
import { SignData } from '../types/client';
import { getP256KeyPairFromPub, aes256_decrypt, parseDER } from '../util';
import { decryptResponse } from './shared';
import { ActiveWallets, Currency } from './types/client';
import { getSharedSecret, parseWallets } from './utilities';

/**
 * `decodeConnectResponse` will call `StartPairingMode` on the device, which gives the user 60 seconds to
 * finalize the pairing. This will return an ephemeral public key, which is needed for the next
 * request.
 * - If the device is already paired, this ephemPub is simply used to encrypt the next request.
 * - If the device is not paired, it is needed to pair the device within 60 seconds.
 * @category Device Response
 * @internal
 * @returns true if we are paired to the device already
 */
export const decodeConnectResponse = (
  res,
  key,
): {
  isPaired: boolean;
  fwVersion: Buffer;
  activeWallets: ActiveWallets | undefined;
  ephemeralPub: Buffer;
} => {
  let off = 0;
  const isPaired = res.readUInt8(off) === messageConstants.PAIRED;
  off++;
  // If we are already paired, we get the next ephemeral key
  const pub = res.slice(off, off + 65).toString('hex');
  off += 65;
  // Grab the firmware version (will be 0-length for older fw versions) It is of format
  // |fix|minor|major|reserved|
  const fwVersion = res.slice(off, off + 4);
  off += 4;
  // Set the public key
  const ephemeralPub = getP256KeyPairFromPub(pub);
  // If we are already paired, the response will include some encrypted data about the current
  // wallets This data was added in Lattice firmware v0.14.1
  if (isPaired) {
    //TODO && this._fwVersionGTE(0, 14, 1)) {
    // Later versions of firmware added wallet info
    const encWalletData = res.slice(off, off + 160);
    off += 160;
    const sharedSecret = getSharedSecret(key, ephemeralPub);
    const decWalletData = aes256_decrypt(encWalletData, sharedSecret);
    // Sanity check to make sure the last part of the decrypted data is empty. The last 2 bytes
    // are AES padding
    if (
      decWalletData[decWalletData.length - 2] !== 0 ||
      decWalletData[decWalletData.length - 1] !== 0
    ) {
      throw new Error('Failed to connect to Lattice.');
    }
    const activeWallets = parseWallets(decWalletData);
    return { isPaired, fwVersion, activeWallets, ephemeralPub };
  }
  // return the state of our pairing
  return { isPaired, fwVersion, activeWallets: undefined, ephemeralPub };
};

/**
 * Pair will create a new pairing if the user successfully enters the secret into the device in
 * time. If successful (`status=0`), the device will return a new ephemeral public key, which is
 * used to derive a shared secret for the next request
 * @category Device Response
 * @internal
 * @returns error (or null)
 */
export const decodePairResponse = (
  encryptedResponse: any,
  sharedSecret: Buffer,
) => {
  return decryptResponse(encryptedResponse, decResLengths.empty, sharedSecret);
};

/**
 * @category Device Response
 * @internal
 * @return an array of address strings
 */
export const decodeGetAddresses = (data, flag): Buffer[] => {
  let off = 65; // Skip 65 byte pubkey prefix
  // Look for addresses until we reach the end (a 4 byte checksum)
  const addrs = [];
  // Pubkeys are formatted differently in the response
  const { ED25519_PUB, SECP256K1_PUB } = Constants.GET_ADDR_FLAGS;
  const arePubkeys = flag === ED25519_PUB || flag === SECP256K1_PUB;
  if (arePubkeys) {
    off += 1; // skip uint8 representing pubkey type
  }
  while (off + 4 < decResLengths.getAddresses) {
    if (arePubkeys) {
      // Pubkeys are shorter and are returned as buffers
      const pubBytes = data.slice(off, off + 65);
      const isEmpty = pubBytes.every((byte) => byte === 0x00);
      if (!isEmpty && flag === ED25519_PUB) {
        // ED25519 pubkeys are 32 bytes
        addrs.push(pubBytes.slice(0, 32));
      } else if (!isEmpty) {
        // Only other returned pubkeys are ECC, or 65 bytes Note that we return full
        // (uncompressed) ECC pubkeys
        addrs.push(pubBytes);
      }
      off += 65;
    } else {
      // Otherwise we are dealing with address strings
      const addrBytes = data.slice(off, off + ADDR_STR_LEN);
      off += ADDR_STR_LEN;
      // Return the UTF-8 representation
      const len = addrBytes.indexOf(0); // First 0 is the null terminator
      if (len > 0) {
        addrs.push(addrBytes.slice(0, len).toString());
      }
    }
  }

  return addrs;
};

/**
 * `decodeSignResponse` takes the encrypted response from the device and decrypts it. It then parses the
 * decrypted response and returns the data.
 * @category Device Response
 * @internal
 * @param data - The encrypted response from the server
 * @param currency - The type of currency being signed.
 * @param req - The original request data
 * @returns The transaction data, the transaction hash, and the signature.
 */
export const decodeSignResponse = (
  data: Buffer,
  currency: Currency,
  req = null,
): SignData => {
  const PUBKEY_PREFIX_LEN = 65;
  const PKH_PREFIX_LEN = 20;
  let off = PUBKEY_PREFIX_LEN; // Skip past pubkey prefix
  // Get the change data if we are making a BTC transaction
  let changeRecipient;
  if (currency === CURRENCIES.BTC) {
    const changeVersion = bitcoin.getAddressFormat(req.origData.changePath);
    const changePubKeyHash = data.slice(off, off + PKH_PREFIX_LEN);
    off += PKH_PREFIX_LEN;
    changeRecipient = bitcoin.getBitcoinAddress(
      changePubKeyHash,
      changeVersion,
    );
  }
  const DERLength = 74; // max size of a DER signature -- all Lattice sigs are this long
  const SIGS_OFFSET = 10 * DERLength; // 10 signature slots precede 10 pubkey slots
  const PUBKEYS_OFFSET = PUBKEY_PREFIX_LEN + PKH_PREFIX_LEN + SIGS_OFFSET;

  if (currency === CURRENCIES.BTC) {
    const compressedPubLength = 33; // Size of compressed public key
    const pubkeys = [];
    const sigs = [];
    let n = 0;
    // Parse the signature for each output -- they are returned in the serialized payload in form
    // [pubkey, sig] There is one signature per output
    while (off < data.length) {
      // Exit out if we have seen all the returned sigs and pubkeys
      if (data[off] !== 0x30) break;
      // Otherwise grab another set Note that all DER sigs returned fill the maximum 74 byte
      // buffer, but also contain a length at off+1, which we use to parse the non-zero data.
      // First get the signature from its slot
      const sigStart = off;
      const sigEnd = off + 2 + data[off + 1];
      sigs.push(data.slice(sigStart, sigEnd));
      // Next, shift by the full set of signatures to hit the respective pubkey NOTE: The data
      // returned is: [<sig0>, <sig1>, ... <sig9>][<pubkey0>, <pubkey1>, ... <pubkey9>]
      const pubStart = n * compressedPubLength + PUBKEYS_OFFSET;
      const pubEnd = (n + 1) * compressedPubLength + PUBKEYS_OFFSET;
      pubkeys.push(data.slice(pubStart, pubEnd));
      // Update offset to hit the next signature slot
      off += DERLength;
      n += 1;
    }
    // Build the transaction data to be serialized
    const preSerializedData = {
      inputs: [],
      outputs: [],
    };

    // First output comes from request dta
    preSerializedData.outputs.push({
      value: req.origData.value,
      recipient: req.origData.recipient,
    });
    if (req.changeData.value > 0) {
      // Second output comes from change data
      preSerializedData.outputs.push({
        value: req.changeData.value,
        recipient: changeRecipient,
      });
    }

    // Add the inputs
    for (let i = 0; i < sigs.length; i++) {
      preSerializedData.inputs.push({
        hash: req.origData.prevOuts[i].txHash,
        index: req.origData.prevOuts[i].index,
        sig: sigs[i],
        pubkey: pubkeys[i],
        signerPath: req.origData.prevOuts[i].signerPath,
      });
    }

    // Finally, serialize the transaction
    const serializedTx = bitcoin.serializeTx(preSerializedData);
    // Generate the transaction hash so the user can look this transaction up later
    const preImageTxHash = serializedTx;
    const txHashPre: Buffer = Buffer.from(
      sha256().update(Buffer.from(preImageTxHash, 'hex')).digest('hex'),
      'hex',
    );
    // Add extra data for debugging/lookup purposes
    return {
      tx: serializedTx,
      txHash: sha256().update(txHashPre).digest('hex'),
      changeRecipient,
      sigs,
    };
  } else if (currency === CURRENCIES.ETH) {
    const sig = parseDER(data.slice(off, off + 2 + data[off + 1]));
    off += DERLength;
    const ethAddr = data.slice(off, off + 20);
    // Determine the `v` param and add it to the sig before returning
    const { rawTx, sigWithV } = ethereum.buildEthRawTx(req, sig, ethAddr);
    return {
      tx: `0x${rawTx}`,
      txHash: `0x${ethereum.hashTransaction(rawTx)}`,
      sig: {
        v: sigWithV.v,
        r: sigWithV.r.toString('hex'),
        s: sigWithV.s.toString('hex'),
      },
      signer: ethAddr,
    };
  } else if (currency === CURRENCIES.ETH_MSG) {
    const sig = parseDER(data.slice(off, off + 2 + data[off + 1]));
    off += DERLength;
    const signer = data.slice(off, off + 20);
    const validatedSig = ethereum.validateEthereumMsgResponse(
      { signer, sig },
      req,
    );
    return {
      sig: {
        v: validatedSig.v,
        r: validatedSig.r.toString('hex'),
        s: validatedSig.s.toString('hex'),
      },
      signer,
    };
  } else {
    // Generic signing request
    return parseGenericSigningResponse(
      data,
      off,
      req.curveType,
      req.omitPubkey,
    );
  }
};
