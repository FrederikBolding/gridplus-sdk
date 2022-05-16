import { UInt4 } from 'bitwise/types';
import { encReqCodes, MAX_ADDR } from '../constants';
import { checksum, isUInt4 } from '../util';
import { Wallet } from './types/client';

export const validateValueExists = (arg: { [key: string]: any }) => {
  const [key, [, value]] = Object.entries(arg);
  if (!value) {
    throw new Error(`${key} must be provided`);
  }
};

export const validateIsUInt4 = (n: number) => {
  if (!isUInt4(n)) {
    throw new Error('Must be an integer between 0 and 15 inclusive');
  }
  return n as UInt4;
};

export const validateNAddresses = (n: number) => {
  validateIsUInt4(n);
  if (n > MAX_ADDR)
    throw new Error(`You may only request ${MAX_ADDR} addresses at once.`);
};

export const validateStartPath = (startPath: number[]) => {
  if (!startPath) {
    throw new Error('Start path is required');
  }
  if (startPath.length < 2 || startPath.length > 5)
    throw new Error('Path must include between 2 and 5 indices');
};

export const validateDeviceId = (deviceId: string) => {
  if (!deviceId) {
    throw new Error(
      'No device ID has been stored. Please connect with your device ID first.',
    );
  }
};

export const validateEncryptRequestCode = (code: keyof typeof encReqCodes) => {
  if (code && encReqCodes[code] === undefined) {
    throw new Error('Unknown encrypted request code.');
  }
};

export const validateAppName = (name: string) => {
  if (name.length < 5 || name.length > 24) {
    throw new Error(
      'Invalid length for name provided. Must be 5-24 characters.',
    );
  }
  return name;
};

export const validateResponse = (res: Buffer) => {
  if (!res) {
    throw new Error('Error decrypting response');
  }
};

export const validateUrl = (url: string | undefined) => {
  if (!url) {
    throw new Error('Url does not exist. Please reconnect.');
  }
  return url;
};

export const validateFwVersion = (fwVersion: Buffer | undefined) => {
  if (!fwVersion) {
    throw new Error('Firmware version does not exist. Please reconnect.');
  }
  return fwVersion;
};

/**
 * Validate checksum. It will be the last 4 bytes of the decrypted payload. The length of the
 * decrypted payload will be fixed for each given message type.
 */
export const validateChecksum = (res: Buffer, length: number) => {
  const toCheck = res.slice(0, length);
  const cs = parseInt(`0x${res.slice(length, length + 4).toString('hex')}`);
  const csCheck = checksum(toCheck);
  if (cs !== csCheck) {
    throw new Error(
      `Checksum mismatch in response from Lattice (calculated ${csCheck}, wanted ${cs})`,
    );
  }
};

export const validateRequestError = (err: LatticeError) => {
  const isTimeout = err.code === 'ECONNABORTED' && err.errno === 'ETIME';
  if (isTimeout) {
    throw new Error(
      'Timeout waiting for device. Please ensure it is connected to the internet and try again in a minute.',
    );
  }
  throw new Error(`Failed to make request to device: ${err.message}`);
};

export const validateWallet = (wallet: Wallet | null): Wallet => {
  if (wallet === null) {
    throw new Error('No active wallet.');
  }
  return wallet;
};
