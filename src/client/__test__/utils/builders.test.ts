import { getFwVersionsList } from './builders'

describe('Client', () => {
  it('should test client', () => {
    expect(getFwVersionsList()).toMatchSnapshot()
  })
})