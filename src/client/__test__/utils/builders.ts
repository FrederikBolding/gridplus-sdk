import { CURRENCIES } from '../../../constants';
import { getP256KeyPair } from '../../../util';
import { Currency, EncodeSignRequestParams } from '../../types/client';

export const getFwVersionsList = () => {
  const arr: number[][] = [];
  Array.from({ length: 1 }, (x, i) => {
    Array.from({ length: 10 }, (y, j) => {
      Array.from({ length: 5 }, (z, k) => {
        arr.push([i, j + 10, k])
      });
    });
  });
  return arr
}


export const buildConnectObject = ({ ...overrides }) => ({
  deviceId: 'test',
  key: getP256KeyPair(Buffer.from('test')),
  baseUrl: 'https://gridpl.us',
  ...overrides
})


export const buildGetAddressesObject = ({ ...overrides }) => ({
  startPath: [0x80000000 + 44, 0x80000000 + 60, 0x80000000, 0, 0],
  n: 1,
  flag: 1,
  url: 'asdf',
  fwVersion: Buffer.from([0, 12, 0]),
  wallet: {
    uid: Buffer.from('test'),
    name: Buffer.from('test'),
    capabilities: 1,
    external: true,
  },
  ephemeralPub: Buffer.from('test'),
  sharedSecret: Buffer.from('test'),
  ...overrides
})

export const buildTransactionObject = ({ ...overrides }): EncodeSignRequestParams => ({
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
  currency: CURRENCIES.ETH as Currency,
  fwVersion: Buffer.from([0, 0, 0]),
  wallet: {
    uid: Buffer.from('test'),
    name: Buffer.from('test'),
    capabilities: 1,
    external: true,
  },
  ...overrides
})

export const buildSharedSecret = () => {
  return Buffer.from([
    89,
    60,
    130,
    80,
    168,
    252,
    34,
    136,
    230,
    71,
    230,
    158,
    51,
    13,
    239,
    237,
    6,
    246,
    71,
    232,
    232,
    175,
    193,
    106,
    106,
    185,
    38,
    1,
    163,
    14,
    225,
    101
  ])
}