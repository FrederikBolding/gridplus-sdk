import { Client } from '../../index'

describe('Client', () => {
  it('should test client', () => {
    const client = new Client();
    expect(client).toBeTruthy();
  })
})