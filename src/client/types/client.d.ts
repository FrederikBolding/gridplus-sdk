import { CURRENCIES, encReqCodes } from '../../constants';

type Currency = keyof typeof CURRENCIES

interface SigningData {
  data: any;
  currency: Currency;
}

type EncryptionRequestCodeKeys = keyof typeof encReqCodes;
type EncryptionRequestCodes = typeof encReqCodes[EncryptionRequestCodeKeys];

interface Wallet {
  /** 32 byte id */
  uid?: Buffer;
  /** 20 char (max) string */
  name?: Buffer;
  /** 4 byte flag */
  capabilities?: number;
  /** External or internal wallet */
  external: boolean;
}

interface ActiveWallets {
  internal: Wallet;
  external: Wallet;
}

interface EncryptRequestParams {
  payload: Buffer;
  requestCode: EncryptionRequestCodes;
  ephemeralPubKey: Buffer;
  sharedSecret: Buffer;
}

interface EncodeSignRequestParams {
  data: any;
  currency: Currency;
  wallet: Wallet;
  fwVersion: Buffer;
}

interface RequestParams {
  url: string;
  payload: any; //TODO Fix this any
  timeout?: {
    response: number;
    deadline: number;
  };
  retries?: number;
}

interface ClientStateData {
  activeWallets: ActiveWallets;
  ephemeralPub: Buffer;
  fwVersion: Buffer;
  deviceId: string;
  name: string;
  baseUrl: string;
  privKey: Buffer;
  key: Buffer;
  retryCount: number;
  timeout: number;
}