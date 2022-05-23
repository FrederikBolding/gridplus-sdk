import { ValidateConnectRequestParams, ValidatedConnectRequest } from './types/connect';
import {
  validateBaseUrl,
  validateDeviceId,
  validateEphemeralPub,
  validateFwVersion,
  validateIsUInt4,
  validateKey,
  validateNAddresses,
  validateSharedSecret,
  validateStartPath,
  validateUrl,
  validateWallet,
} from './validationFunctions';

export const validateConnectRequest = ({
  deviceId,
  key,
  baseUrl,
}: ValidateConnectRequestParams): ValidatedConnectRequest => {
  const validDeviceId = validateDeviceId(deviceId);
  const validKey = validateKey(key);
  const validBaseUrl = validateBaseUrl(baseUrl);

  return {
    deviceId: validDeviceId,
    key: validKey,
    baseUrl: validBaseUrl,
  };
};

export const validateGetAddressesRequest = ({
  startPath,
  n,
  flag,
  url,
  fwVersion,
  wallet,
  ephemeralPub,
  sharedSecret,
}: ValidateGetAddressesRequestParams) => {
  validateStartPath(startPath);
  validateNAddresses(n);
  validateIsUInt4(flag);
  const validUrl = validateUrl(url);
  const validFwVersion = validateFwVersion(fwVersion);
  const validWallet = validateWallet(wallet);
  const validEphemeralPub = validateEphemeralPub(ephemeralPub);
  const validSharedSecret = validateSharedSecret(sharedSecret);

  return {
    url: validUrl,
    fwVersion: validFwVersion,
    wallet: validWallet,
    ephemeralPub: validEphemeralPub,
    sharedSecret: validSharedSecret,
  };
};

export const validateFetchActiveWallet = ({
  url,
  ephemeralPub,
  sharedSecret,
}: ValidateFetchActiveWalletRequestParams) => {
  const validUrl = validateUrl(url);
  const validEphemeralPub = validateEphemeralPub(ephemeralPub);
  const validSharedSecret = validateSharedSecret(sharedSecret);

  return {
    url: validUrl,
    ephemeralPub: validEphemeralPub,
    sharedSecret: validSharedSecret,
  };
};
