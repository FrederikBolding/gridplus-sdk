import { encReqCodes } from '../constants';
import { encryptRequest } from './shared';

export const encryptPairRequest = (
  payload: Buffer,
  ephemeralPubKey: Buffer,
  sharedSecret: Buffer,
) => {
  return encryptRequest({
    requestCode: encReqCodes.FINALIZE_PAIRING,
    payload,
    ephemeralPubKey,
    sharedSecret,
  });
};

export const encryptGetAddressesRequest = (
  payload: Buffer,
  ephemeralPubKey: Buffer,
  sharedSecret: Buffer,
) => {
  return encryptRequest({
    requestCode: encReqCodes.GET_ADDRESSES,
    payload,
    ephemeralPubKey,
    sharedSecret,
  });
};

export const encryptSignRequest = (
  payload: Buffer,
  ephemeralPubKey: Buffer,
  sharedSecret: Buffer,
) => {
  return encryptRequest({
    requestCode: encReqCodes.SIGN_TRANSACTION,
    payload,
    ephemeralPubKey,
    sharedSecret,
  });
};
