//@ts-expect-error - no type info
import { KeyPair } from 'elliptic';
import { BASE_URL, decResLengths } from '../constants';
import { SignData } from '../types/client';
import { getP256KeyPair, getP256KeyPairFromPub, randomBytes } from '../util';
import {
  decodeConnectResponse,
  decodeGetAddresses,
  decodePairResponse,
  decodeSignResponse,
} from './decoders';
import { decryptGetAddressesResponse, decryptSignResponse } from './decrypters';
import {
  encodeConnectRequest,
  encodeGetAddressesRequest,
  encodePairRequest,
  encodeSignRequest,
} from './encoders';
import {
  encryptGetAddressesRequest,
  encryptPairRequest,
  encryptSignRequest,
} from './encrypters';
import { doesFetchWalletsOnLoad } from './predicates';
import {
  requestConnect,
  requestGetAddresses,
  requestPair,
  requestSign,
} from './requests';
import { ActiveWallets, SigningData } from './types/client';
import {
  validateAppName,
  validateFwVersion,
  validateUrl,
  validateValueExists,
  validateWallet,
} from './validationFunctions';
import {
  validateConnectRequest,
  validateGetAddressesRequest,
} from './validators';

const EMPTY_WALLET_UID = Buffer.alloc(32);

/**
 * `Client` is a class-based interface for managing a Lattice device.
 */
export class Client {
  /** Is the Lattice paired with this Client. */
  public isPaired: boolean;
  /** The time to wait for a response before cancelling. */
  public timeout: number;

  private baseUrl: string;
  private url?: string;
  /** `name` is a human readable string associated with this app on the Lattice */
  private name: string;
  private key: KeyPair;
  // `privKey` is used to generate a keypair, which is used for maintaining an encrypted messaging
  // channel with the target Lattice
  private privKey: Buffer | string;
  private retryCount: number;
  private fwVersion?: Buffer;
  private skipRetryOnWrongWallet: boolean;

  /** Temporary secret that is generated by the Lattice device */
  private ephemeralPub: KeyPair;
  /** The ID of the connected Lattice */
  private deviceId: string | null;
  /** Information about the current wallet. Should be null unless we know a wallet is present */
  private activeWallets: ActiveWallets = {
    internal: {
      uid: EMPTY_WALLET_UID,
      external: false,
    },
    external: {
      uid: EMPTY_WALLET_UID,
      external: true,
    },
  };

  /**
   * @param params - Parameters are passed as an object.
   */
  constructor(
    baseUrl = BASE_URL,
    name = 'Unknown',
    privKey = randomBytes(32),
    stateData?: string,
    timeout = 60000,
    retryCount = 3,
    skipRetryOnWrongWallet = false,
  ) {
    this.name = validateAppName(name);
    this.baseUrl = baseUrl;
    this.ephemeralPub = null;
    this.deviceId = null;
    this.isPaired = false;
    this.timeout = timeout;
    this.retryCount = retryCount;
    this.skipRetryOnWrongWallet = skipRetryOnWrongWallet;
    this.privKey = privKey;
    this.key = getP256KeyPair(this.privKey);

    /** The user may pass in state data to rehydrate a session that was previously cached */
    if (stateData) {
      this.unpackAndApplyStateData(stateData);
      return;
    }
  }

  /**
   * Get the shared secret, derived via ECDH from the local private key and the ephemeral public key
   * @internal
   * @returns Buffer
   */
  private get sharedSecret () {
    // Once every ~256 attempts, we will get a key that starts with a `00` byte, which can lead to
    // problems initializing AES if we don't force a 32 byte BE buffer.
    return Buffer.from(
      this.key.derive(this.ephemeralPub.getPublic()).toArray('be', 32),
    );
  }

  /**
   * Get a JSON string containing state data that can be used to rehydrate a session. Pass the
   * contents of this to the constructor as `stateData` to rehydrate.
   */
  public get stateData () {
    return this.packStateData();
  }

  /**
   * `getFwVersion` gets the firmware version of the paired device.
   * @returns Either an object with semver properties (fix, minor, and major) or `null`.
   */
  public getFwVersion (): {
    fix: number;
    minor: number;
    major: number;
  } | null {
    if (this.fwVersion && this.fwVersion.length >= 3) {
      return {
        fix: this.fwVersion[0],
        minor: this.fwVersion[1],
        major: this.fwVersion[2],
      };
    }
    return null;
  }

  /**
   * `getAppName` returns the name of the application to which this device is currently paired.
   */
  public getAppName (): string {
    return this.name;
  }

  /**
   * `connect` will attempt to contact a device based on its `deviceId`. The response should include
   * an ephemeral public key, which is used to pair with the device in a later request.
   * @category Lattice
   */
  public async connect (id: string) {
    const { deviceId, key, baseUrl } = validateConnectRequest({
      deviceId: id,
      key: this.key,
      baseUrl: this.baseUrl,
    });

    const payload = await encodeConnectRequest(key);

    const response = await requestConnect(payload, baseUrl);

    const { isPaired, fwVersion, activeWallets, ephemeralPub } = await decodeConnectResponse(
      response,
      key,
    );

    this.deviceId = deviceId;
    this.ephemeralPub = ephemeralPub
    this.url = `${this.baseUrl}/${deviceId}`;
    this.isPaired = isPaired;
    this.fwVersion = fwVersion;
    if (activeWallets) {
      this.activeWallets = activeWallets;
    }

    // If we are paired and are on older firmware (<0.14.1), we need a follow up request to sync
    // wallet state.
    if (isPaired && !doesFetchWalletsOnLoad(fwVersion)) {
      await this.fetchActiveWallet();
    }

    return isPaired;
  }

  /**
   * If a pairing secret is provided, `pair` uses it to sign a hash of the public key, name, and
   * pairing secret. It then sends the name and signature to the device. If no pairing secret is
   * provided, `pair` sends a zero-length name buffer to the device.
   * @category Lattice
   * @returns The active wallet object.
   */
  public async pair (pairingSecret: string) {
    const name = validateAppName(this.name);
    const url = validateUrl(this.url);

    const payload = await encodePairRequest(this.key, pairingSecret, name);

    const encryptedPayload = await encryptPairRequest(
      payload,
      this.ephemeralPub,
      this.sharedSecret,
    );
    const encryptedResponse = await requestPair(encryptedPayload, url);

    const { ephemeralPub } = await decodePairResponse(
      encryptedResponse,
      this.sharedSecret,
    );

    this.ephemeralPub = ephemeralPub;

    // Try to get the active wallet once pairing is successful
    await this.fetchActiveWallet();
    return this.hasActiveWallet();
  }

  /**
   * `getAddresses` takes a starting path and a number to get the addresses associated with the
   * active wallet.
   * @category Lattice
   * @returns An array of addresses.
   */
  public async getAddresses ({
    startPath,
    n,
    flag = 0,
  }: GetAddressesParams): Promise<Buffer[]> {
    const { url, fwVersion, wallet, ephemeralPub, sharedSecret } =
      validateGetAddressesRequest({
        startPath,
        n,
        flag,
        url: this.url,
        fwVersion: this.fwVersion,
        wallet: this.activeWallet,
        ephemeralPub: this.ephemeralPub,
        sharedSecret: this.sharedSecret,
      });

    const payload = encodeGetAddressesRequest({
      startPath,
      n,
      flag,
      fwVersion,
      wallet,
    });

    const encryptedPayload = encryptGetAddressesRequest(
      payload,
      ephemeralPub,
      sharedSecret,
    );

    const encryptedResponse = await requestGetAddresses(encryptedPayload, url);

    const { decryptedData, newEphemeralPub } = decryptGetAddressesResponse(
      encryptedResponse,
      sharedSecret,
    );
    const data = decodeGetAddresses(decryptedData, flag);

    this.ephemeralPub = newEphemeralPub;

    return data;
  }

  /**
   * `sign` builds and sends a request for signing to the device.
   * @category Lattice
   * @returns The response from the device.
   */
  public async sign ({ data, currency }: SigningData): Promise<SignData> {
    validateValueExists({ data });
    const url = validateUrl(this.url);
    const fwVersion = validateFwVersion(this.fwVersion);
    const wallet = validateWallet(this.activeWallet);

    const payload = encodeSignRequest({
      data,
      currency,
      fwVersion,
      wallet,
    });

    const encryptedPayload = encryptSignRequest(
      payload,
      this.ephemeralPub,
      this.sharedSecret,
    );

    const encryptedResponse = await requestSign(encryptedPayload, url);

    const { decryptedData, ephemeralPub } = decryptSignResponse(
      encryptedResponse,
      this.sharedSecret,
    );

    this.ephemeralPub = ephemeralPub;

    const transaction = decodeSignResponse(decryptedData, currency);

    return transaction;
  }

  /**
   * Return JSON-stringified version of state data. Can be used to rehydrate an SDK session without
   * reconnecting to the target Lattice.
   */
  private packStateData () {
    try {
      const data = {
        activeWallets: {
          internal: {
            uid: this.activeWallets.internal.uid?.toString('hex'),
            name: this.activeWallets.internal.name?.toString(),
            capabilities: this.activeWallets.internal.capabilities,
          },
          external: {
            uid: this.activeWallets.external.uid?.toString('hex'),
            name: this.activeWallets.external.name?.toString(),
            capabilities: this.activeWallets.external.capabilities,
          },
        },
        ephemeralPub: this.ephemeralPub.getPublic().encode('hex'),
        fwVersion: this.fwVersion?.toString('hex'),
        deviceId: this.deviceId,
        name: this.name,
        baseUrl: this.baseUrl,
        privKey: this.privKey.toString('hex'),
        retryCount: this.retryCount,
        timeout: this.timeout,
      };
      return JSON.stringify(data);
    } catch (err) {
      console.warn('Could not pack state data.');
      return null;
    }
  }

  /**
   * Unpack a JSON-stringified version of state data and apply it to state. This will allow us to
   * rehydrate an old session.
   */
  private unpackAndApplyStateData (data: string) {
    try {
      const unpacked = JSON.parse(data);
      // Attempt to parse the data
      const internalWallet = {
        uid: Buffer.from(unpacked.activeWallets.internal.uid, 'hex'),
        name: Buffer.from(unpacked.activeWallets.internal.name),
        capabilities: unpacked.activeWallets.internal.capabilities,
        external: false,
      };
      const externalWallet = {
        uid: Buffer.from(unpacked.activeWallets.external.uid, 'hex'),
        name: Buffer.from(unpacked.activeWallets.external.name),
        capabilities: unpacked.activeWallets.external.capabilities,
        external: true,
      };
      const ephemeralPubBytes = Buffer.from(unpacked.ephemeralPub, 'hex');
      const fwVersionBytes = Buffer.from(unpacked.fwVersion, 'hex');
      const privKeyBytes = Buffer.from(unpacked.privKey, 'hex');
      // Apply unpacked params
      this.activeWallets.internal = internalWallet;
      this.activeWallets.external = externalWallet;
      this.ephemeralPub = getP256KeyPairFromPub(ephemeralPubBytes);
      this.fwVersion = fwVersionBytes;
      this.deviceId = unpacked.deviceId;
      this.name = unpacked.name;
      this.baseUrl = unpacked.baseUrl;
      this.privKey = privKeyBytes;
      this.key = getP256KeyPair(this.privKey);
      this.retryCount = unpacked.retryCount;
      this.timeout = unpacked.timeout;
    } catch (err) {
      console.warn('Could not apply state data.');
    }
  }

  /** Get the active wallet */
  public get activeWallet () {
    if (
      this.activeWallets.external.uid &&
      !EMPTY_WALLET_UID.equals(this.activeWallets.external.uid)
    ) {
      return this.activeWallets.external;
    } else if (
      this.activeWallets.internal.uid &&
      !EMPTY_WALLET_UID.equals(this.activeWallets.internal.uid)
    ) {
      return this.activeWallets.internal;
    } else {
      return null;
    }
  }

  /** Check if the user has an active wallet */
  private hasActiveWallet () {
    return !!this.activeWallet;
  }

  /**
   * `test` takes a data object with a testID and a payload, and sends them to the device.
   * @category Lattice
   */
  private async test (data: { payload: Buffer, testID: number }) {
    if (!data.payload) {
      throw new Error(
        'First argument must contain `testID` and `payload` fields.',
      );
    }
    const TEST_DATA_SZ = 500;
    const payload = Buffer.alloc(TEST_DATA_SZ + 6);
    payload.writeUInt32BE(data.testID, 0);
    payload.writeUInt16BE(data.payload.length, 4);
    data.payload.copy(payload, 6);
    const res = await this._request(payload, 'TEST');
    const decrypted = this._handleEncResponse(res, decResLengths.test);
    return decrypted.slice(65); // remove ephem pub
  }
}