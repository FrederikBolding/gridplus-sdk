import { request } from './shared';

export const requestConnect = async (payload: Buffer, url: string): Promise<Buffer> => {
  return request({ payload, url });
};

export const requestPair = async (payload: Buffer, url: string) => {
  return request({ payload, url });
};

export const requestGetAddresses = async (payload: Buffer, url: string) => {
  return request({ payload, url });
};

export const requestSign = async (payload: Buffer, url: string) => {
  return request({ payload, url });
};

export const requestFetchActiveWallets = async (payload: Buffer, url: string) => {
  return request({ payload, url });
};
