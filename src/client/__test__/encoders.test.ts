import { getP256KeyPair } from '../../util';
import { EXTERNAL } from '../../constants';
import {
  encodeConnectRequest,
  encodeGetAddressesRequest,
  encodePairRequest,
  encodeSignRequest,
} from '../encoders';
import {
  buildGetAddressesObject,
  buildTransactionObject,
  getFwVersionsList,
} from './utils/builders';

describe('encoders', () => {
  describe('Client.connect()', () => {
    test('should test connect encoder', () => {
      const privKey = Buffer.alloc(32, '1');
      expect(privKey.toString()).toMatchSnapshot();
      const key = getP256KeyPair(privKey);
      const payload = encodeConnectRequest(key);
      const payloadAsString = payload.toString('hex');
      expect(payloadAsString).toMatchSnapshot();
    });
  });

  describe('Client.pair()', () => {
    test('should test pair encoder', () => {
      const privKey = Buffer.alloc(32, '1');
      expect(privKey.toString()).toMatchSnapshot();
      const key = getP256KeyPair(privKey);
      const payload = encodePairRequest(key, 'testtest', 'testtest');
      const payloadAsString = payload.toString('hex');
      expect(payloadAsString).toMatchSnapshot();
    });
  });

  describe('Client.getAddresses()', () => {
    test('encodeGetAddressesRequest with default flag', () => {
      const mockObject = buildGetAddressesObject({});
      const payload = encodeGetAddressesRequest(mockObject);
      const payloadAsString = payload.toString('hex');
      expect(payloadAsString).toMatchSnapshot();
    });

    test('encodeGetAddressesRequest with ED25519_PUB', () => {
      const mockObject = buildGetAddressesObject({
        flag: EXTERNAL.GET_ADDR_FLAGS.ED25519_PUB,
      });
      const payload = encodeGetAddressesRequest(mockObject);
      const payloadAsString = payload.toString('hex');
      expect(payloadAsString).toMatchSnapshot();
    });

    test('encodeGetAddressesRequest with SECP256K1_PUB', () => {
      const mockObject = buildGetAddressesObject({
        flag: EXTERNAL.GET_ADDR_FLAGS.SECP256K1_PUB,
      });
      const payload = encodeGetAddressesRequest(mockObject);
      const payloadAsString = payload.toString('hex');
      expect(payloadAsString).toMatchSnapshot();
    });

    test('encodeGetAddressesRequest should throw with invalid startPath on old firmware', () => {
      const startPath = [0x80000000 + 44, 0x80000000 + 60, 0, 0, 0, 0, 0]
      const fwVersion = Buffer.from([0, 0, 0])
      const testEncodingFunction = () =>
        encodeGetAddressesRequest(
          buildGetAddressesObject({ startPath, fwVersion }),
        );
      expect(testEncodingFunction).toThrowError('derivation paths with 5 indices');
    });
  });

  describe('Client.sign()', () => {
    test.each(getFwVersionsList())(
      'should test sign encoder with firmware v%d.%d.%d',
      (major, minor, patch) => {
        const payload = encodeSignRequest(
          buildTransactionObject({
            fwVersion: Buffer.from([patch, minor, major]),
          }),
        );
        const payloadAsString = payload.toString('hex');
        expect(payloadAsString).toMatchSnapshot();
      },
    );
  });
});
