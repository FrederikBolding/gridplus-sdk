import bitwise from 'bitwise';
import { Byte, UInt4 } from 'bitwise/types';
//@ts-expect-error - type mismatch
import { KeyPair } from 'elliptic';
import {
  deviceCodes,
  EXTERNAL,
  getFwVersionConst
} from '../constants';
import { generateAppSecret, isValidAssetPath, toPaddedDER } from '../util';
import { buildTransaction } from './shared';
import { EncodeGetAddressesRequestParams, EncodeSignRequestParams } from './types/client';
import { buildRequest, getPubKeyBytes } from './utilities';
import { validateWallet } from './validators';

export const encodeConnectRequest = (key: KeyPair) => {
  const deviceCode = deviceCodes.CONNECT;
  const pubKeyBytes = getPubKeyBytes(key);
  const payload = buildRequest(deviceCode, pubKeyBytes);
  return payload;
};

export const encodePairRequest = (
  key: KeyPair,
  pairingSecret: string,
  name: string,
) => {
  const pubKeyBytes = getPubKeyBytes(key);
  const nameBuf = Buffer.alloc(25);
  if (pairingSecret.length > 0) {
    // If a pairing secret of zero length is passed in, it usually indicates we want to cancel
    // the pairing attempt. In this case we pass a zero-length name buffer so the firmware can
    // know not to draw the error screen. Note that we still expect an error to come back
    // (RESP_ERR_PAIR_FAIL)
    nameBuf.write(name);
  }
  const hash = generateAppSecret(
    pubKeyBytes,
    nameBuf,
    Buffer.from(pairingSecret),
  );
  const sig = key.sign(hash); // returns an array, not a buffer
  const derSig = toPaddedDER(sig);
  const payload = Buffer.concat([nameBuf, derSig]);
  return payload;
};

export const encodeGetAddressesRequest = ({
  fwVersion,
  startPath,
  n,
  wallet,
  flag,
}: EncodeGetAddressesRequestParams) => {
  const fwConstants = getFwVersionConst(fwVersion);
  const flags = fwConstants.getAddressFlags || [];
  const isPubkeyOnly =
    flags.indexOf(flag) > -1 &&
    (flag === EXTERNAL.GET_ADDR_FLAGS.ED25519_PUB ||
      flag === EXTERNAL.GET_ADDR_FLAGS.SECP256K1_PUB);
  if (!isPubkeyOnly && !isValidAssetPath(startPath, fwConstants)) {
    throw new Error('Parent derivation path is not supported');
  }
  let sz = 32 + 20 + 1; // walletUID + 5 u32 indices + count/flag
  if (fwConstants.varAddrPathSzAllowed) {
    sz += 1; // pathDepth
  } else if (startPath.length !== 5) {
    throw new Error(
      'Your Lattice firmware only supports derivation paths with 5 indices. Please upgrade.',
    );
  }
  const payload = Buffer.alloc(sz);
  let off = 0;

  wallet.uid?.copy(payload, off);
  off += 32;
  // Build the start path (5x u32 indices)
  if (fwConstants.varAddrPathSzAllowed) {
    payload.writeUInt8(startPath.length, off);
    off += 1;
  }
  for (let i = 0; i < 5; i++) {
    if (i <= startPath.length) payload.writeUInt32BE(startPath[i], off);
    off += 4;
  }
  // Specify the number of subsequent addresses to request. We also allow the user to skip the
  // cache and request any address related to the asset in the wallet.
  let val,
    flagVal: UInt4 = 0;
  if (fwConstants.addrFlagsAllowed) {
    // A 4-bit flag can be used for non-standard address requests This needs to be combined with
    // `n` as a 4 bit value
    flagVal =
      fwConstants.getAddressFlags &&
        fwConstants.getAddressFlags.indexOf(flag) > -1
        ? (flag as UInt4)
        : 0;
    const flagBits = bitwise.nibble.read(flagVal);
    const countBits = bitwise.nibble.read(n as UInt4);
    val = bitwise.byte.write(flagBits.concat(countBits) as Byte);
  } else {
    // Very old firmware does not support this flag. We can deprecate this soon.
    val = n;
  }
  payload.writeUInt8(val, off);
  return payload;
};

export const encodeSignRequest = ({
  data,
  currency,
  fwVersion,
  wallet,
}: EncodeSignRequestParams) => {
  // All transaction requests must be put into the same sized buffer. This comes from
  // sizeof(GpTransactionRequest_t), but note we remove the 2-byte schemaId since it is not
  // returned from our resolver. Note that different firmware versions may have different data
  // sizes.
  const fwConstants = getFwVersionConst(fwVersion);
  // Build the signing request payload to send to the device. If we catch bad params, return an
  // error instead
  data = { fwConstants, ...data };
  const req = buildTransaction({ data, currency, fwConstants })
  // if (req && req.err) {
  //   throw new Error(req.err);
  // }
  if (req.payload.length > fwConstants.reqMaxDataSz) {
    throw new Error('Transaction is too large');
  }

  const reqPayload = req.payload;
  const schema = req.schema;

  // Build the payload
  const payload = Buffer.alloc(2 + fwConstants.reqMaxDataSz);
  let off = 0;

  // Whether there will be follow up requests TODO: fix extra payload support
  const hasExtraPayloads =
    req.extraDataPayloads && Number(req.extraDataPayloads.length > 0);
  payload.writeUInt8(hasExtraPayloads, off);
  off += 1;
  // Copy request schema (e.g. ETH or BTC transfer)
  payload.writeUInt8(schema, off);
  off += 1;
  const validWallet = validateWallet(wallet)
  // Copy the wallet UID
  validWallet.uid?.copy(payload, off);
  off += validWallet.uid?.length ?? 0;
  // Build data based on the type of request Copy the payload of the request
  reqPayload.copy(payload, off);
  // Construct the encrypted request and send it
  return payload
};
