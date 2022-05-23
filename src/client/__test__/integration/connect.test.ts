import { Client } from '../../index';

describe('connect', () => {
  it('should test client', async () => {
    const client = new Client();
    const isPaired = await client.connect('intcon')
    expect(isPaired).toMatchSnapshot();
  })
})