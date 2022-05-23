import { requestConnect, requestGetAddresses } from '../../requests';
import { getAddressesEncryptedData, connectRequestData } from '../__mocks__/requestData';

describe('requests', () => {
  describe('connect', () => {
    it('should test client', async () => {
      const response = await requestConnect(connectRequestData, 'https://signing.gridpl.us')
      expect(response).toMatchSnapshot();
    })
  })

  describe('getAddresses', () => {
    it('should test client', async () => {
      const response = await requestGetAddresses(getAddressesEncryptedData, 'https://signing.gridpl.us/getAddresses')
      expect(response).toMatchSnapshot();
    })
  })
})