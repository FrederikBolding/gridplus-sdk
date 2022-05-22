import { request } from './shared';

//TODO: add payload types for each request 

export const requestConnect = async (payload: Buffer, url: string) => {
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

