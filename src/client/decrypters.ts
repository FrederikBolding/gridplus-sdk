import { decResLengths } from '../constants';
import { decryptResponse } from './shared';

export const decryptGetAddressesResponse = (
  response: any,
  sharedSecret: Buffer,
) => {
  const { decryptedData, newEphemeralPub } = decryptResponse(
    response,
    decResLengths.getAddresses,
    sharedSecret,
  );
  return { decryptedData, newEphemeralPub };
};

export const decryptSignResponse = (
  response: any,
  sharedSecret: Buffer,
) => {
  const { decryptedData, newEphemeralPub } = decryptResponse(
    response,
    decResLengths.sign,
    sharedSecret,
  );
  return { decryptedData, newEphemeralPub };
};
