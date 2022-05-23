import { EMPTY_WALLET_UID } from './shared';

export const DEFAULT_ACTIVE_WALLETS = {
  internal: {
    uid: EMPTY_WALLET_UID,
    external: false,
  },
  external: {
    uid: EMPTY_WALLET_UID,
    external: true,
  },
};