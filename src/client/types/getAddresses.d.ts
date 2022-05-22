
interface GetAddressesParams {
  startPath: number[];
  n: number;
  flag?: number;
}

interface ValidateGetAddressesRequestParams extends GetAddressesParams {
  url?: string;
  fwVersion?: Buffer;
  wallet?: Wallet;
  ephemeralPub?: Buffer;
  sharedSecret?: Buffer;
}
interface EncodeGetAddressesRequestParams {
  fwVersion: any;
  startPath: number[];
  n: number;
  wallet: Wallet;
  flag: number;
}
