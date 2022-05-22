import { validateConnectRequest, validateGetAddressesRequest } from '../validators';
import { buildConnectObject, buildGetAddressesObject } from './utils/builders';

describe('validators', () => {
  describe('Client.connect()', () => {
    test('validateConnectRequest should successfully validate', async () => {
      const connectBundle = buildConnectObject({})
      expect(validateConnectRequest(connectBundle)).toMatchSnapshot();
    })

    test('validateConnectRequest should throw errors on validation failure', async () => {
      const connectBundle = buildConnectObject({ baseUrl: '' })
      expect(() => validateConnectRequest(connectBundle)).toThrowError();
    })
  })

  describe('Client.getAddresses()', () => {
    test('validateGetAddressesRequest should successfully validate', async () => {
      const getAddressesBundle = buildGetAddressesObject({})
      expect(validateGetAddressesRequest(getAddressesBundle)).toMatchSnapshot();
    })

    test('validateGetAddressesRequest should throw errors on validation failure', async () => {
      const getAddressesBundle = buildGetAddressesObject({ url: '' })
      expect(() => validateGetAddressesRequest(getAddressesBundle)).toThrowError();
    })
  })
})