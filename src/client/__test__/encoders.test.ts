import { getP256KeyPair } from '../../util';
import {
  encodeConnectRequest,
  encodeGetAddressesRequest,
  encodePairRequest,
  encodeSignRequest,
} from '../encoders';

describe('Client', () => {
  it('should test connect encoder', () => {
    const privKey = Buffer.alloc(32, '1');
    expect(privKey.toString()).toMatchSnapshot();
    const key = getP256KeyPair(privKey);
    const payload = encodeConnectRequest(key);
    const payloadAsString = payload.toString('hex');
    expect(payloadAsString).toMatchSnapshot();
  });

  it('should test pair encoder', () => {
    const privKey = Buffer.alloc(32, '1');
    expect(privKey.toString()).toMatchSnapshot();
    const key = getP256KeyPair(privKey);
    const payload = encodePairRequest(key, 'asdfasdf', 'asdfasdf');
    const payloadAsString = payload.toString('hex');
    expect(payloadAsString).toMatchSnapshot();
  });

  it('should test getAddresses encoder', () => {
    const payload = encodeGetAddressesRequest({
      startPath: [0x80000000 + 44, 0x80000000 + 60, 0x80000000, 0, 0],
      n: 1,
      flag: 1,
      fwVersion: Buffer.from('test'),
      wallet: {
        uid: Buffer.from('test'),
        name: Buffer.from('test'),
        capabilities: 1,
        external: true,
      },
    });
    const payloadAsString = payload.toString('hex');
    expect(payloadAsString).toMatchSnapshot();
  });

  it('should test sign encoder', () => {
    const payload = encodeSignRequest({
      data: {
        to: '0xc0c8f96C2fE011cc96770D2e37CfbfeAFB585F0e',
        from: '0xc0c8f96C2fE011cc96770D2e37CfbfeAFB585F0e',
        value: 0x80000000,
        data: 0x0,
        signerPath: [0x80000000 + 44, 0x80000000 + 60, 0x80000000, 0, 0],
        nonce: 0x80000000,
        gasLimit: 0x80000000,
        gasPrice: 0x80000000,
      },
      currency: 'ETH',
      fwVersion: Buffer.from([0, 12, 0]),
      wallet: {
        uid: Buffer.from('test'),
        name: Buffer.from('test'),
        capabilities: 1,
        external: true,
      },
    });
    const payloadAsString = payload.toString('hex');
    expect(payloadAsString).toMatchSnapshot();
  });
  it('should test sign encoder for fw v0.15.0', () => {
    const payload = encodeSignRequest({
      data: {
        to: '0xc0c8f96C2fE011cc96770D2e37CfbfeAFB585F0e',
        from: '0xc0c8f96C2fE011cc96770D2e37CfbfeAFB585F0e',
        value: 0x80000000,
        data: 0x0,
        signerPath: [0x80000000 + 44, 0x80000000 + 60, 0x80000000, 0, 0],
        nonce: 0x80000000,
        gasLimit: 0x80000000,
        gasPrice: 0x80000000,
      },
      currency: 'ETH',
      fwVersion: Buffer.from([0, 15, 0]),
      wallet: {
        uid: Buffer.from('test'),
        name: Buffer.from('test'),
        capabilities: 1,
        external: true,
      },
    });
    const payloadAsString = payload.toString('hex');
    expect(payloadAsString).toMatchSnapshot();
  });
});
