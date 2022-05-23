import { decodeGetAddresses } from '../../decoders';

describe('Client', () => {
  it('should test client', () => {
    const decryptedData = Buffer.from([0, 0, 0])
    const flag = 0
    expect(decodeGetAddresses(decryptedData, flag)).toMatchSnapshot();
  })
})