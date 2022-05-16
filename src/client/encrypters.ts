import { encReqCodes } from '../constants';
import { encryptRequest } from './shared';

export const encryptPairRequest = (payload, ephemeralPubKey, sharedSecret) => {
  return encryptRequest({
    requestCode: encReqCodes.FINALIZE_PAIRING,
    payload,
    ephemeralPubKey,
    sharedSecret,
  });
};

export const encryptGetAddressesRequest = (
  payload,
  ephemeralPubKey,
  sharedSecret,
) => {
  return encryptRequest({
    requestCode: encReqCodes.GET_ADDRESSES,
    payload,
    ephemeralPubKey,
    sharedSecret,
  });
};

export const encryptSignRequest = (payload, ephemeralPubKey, sharedSecret) => {
  return encryptRequest({
    requestCode: encReqCodes.SIGN_TRANSACTION,
    payload,
    ephemeralPubKey,
    sharedSecret,
  });
};
