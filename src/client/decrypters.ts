import { decResLengths } from '../constants';
import { decryptResponse } from './shared';

export const decryptGetAddressesResponse = (
  response: any,
  sharedSecret: Buffer,
) => {
  const { decryptedData, ephemeralPub } = decryptResponse(
    response,
    decResLengths.getAddresses,
    sharedSecret,
  );
  return { decryptedData, ephemeralPub };
};

export const decryptSignResponse = (
  response: any,
  sharedSecret: Buffer,
) => {
  const { decryptedData, ephemeralPub } = decryptResponse(
    response,
    decResLengths.sign,
    sharedSecret,
  );
  return { decryptedData, ephemeralPub };
};
