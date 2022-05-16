import { CURRENCIES } from '../constants';

type Currency = keyof typeof CURRENCIES

interface SigningData {
  data: any;
  currency: Currency;
}

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

interface GetAddressesParams {
  startPath: number[];
  n: number;
  flag?: number;
}

interface EncodeGetAddressesRequestParams {
  fwVersion: any;
  startPath: number[];
  n: number;
  wallet: Wallet;
  flag: number;
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