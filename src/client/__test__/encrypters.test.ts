import { encryptGetAddressesRequest } from '../encrypters';
import { buildSharedSecret } from './utils/builders';

describe('Client', () => {
  test('encryptGetAddressesRequest should encrypt requests', () => {
    //TODO: update how these test values are generated
    const payload = buildSharedSecret();
    const ephemeralPub = buildSharedSecret();
    const sharedSecret = buildSharedSecret();
    expect(
      encryptGetAddressesRequest(payload, ephemeralPub, sharedSecret),
    ).toMatchSnapshot();
  });

  test('encryptGetAddressesRequest should throw an error if it fails to encrypt requests', () => {
    //TODO: update how these test values are generated
    const payload = Buffer.from('test');
    const ephemeralPub = Buffer.from('test');
    const sharedSecret = Buffer.from('test');
    expect(() =>
      encryptGetAddressesRequest(payload, ephemeralPub, sharedSecret),
    ).toThrowError();
  });
});
