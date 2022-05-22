import { requestGetAddresses } from '../requests';
import { getAddressesEncryptedData } from './__mocks__/requestData';

describe('requests', () => {
  describe('Client.connect()', () => {
    it('should test client', async () => {
      const response = await requestGetAddresses(Buffer.from(''), 'https://signing.gridpl.us/connect')
      expect(response).toMatchSnapshot();
    })
  })

  describe('Client.getAddresses()', () => {
    it('should test client', async () => {
      const response = await requestGetAddresses(getAddressesEncryptedData, 'https://signing.gridpl.us/getAddresses')
      expect(response).toMatchSnapshot();
    })
  })
})