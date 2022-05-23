import { decResLengths } from '../constants';
import { decryptResponse } from './shared';

export const decryptGetAddressesResponse = (
  response: Buffer,
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
  response: Buffer,
  sharedSecret: Buffer,
) => {
  const { decryptedData, newEphemeralPub } = decryptResponse(
    response,
    decResLengths.sign,
    sharedSecret,
  );
  return { decryptedData, newEphemeralPub };
};

export const decryptFetchActiveWalletResponse = (
  response: Buffer,
  sharedSecret: Buffer,
) => {
  const { decryptedData, newEphemeralPub } = decryptResponse(
    response,
    decResLengths.getWallets,
    sharedSecret,
  );
  return { decryptedData, newEphemeralPub };
};
