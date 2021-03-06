/* eslint-disable @typescript-eslint/no-non-null-assertion */

export const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID!;

export const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID!;

export const NOMADZ_CONTRACT = process.env.NEXT_PUBLIC_NOMADZ_CONTRACT!;

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT!;

export const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!;

export const CLOSE_WHITELIST_TIMESTAMP = new Date(
  process.env.NEXT_PUBLIC_CLOSE_WHITELIST_TIMESTAMP ?? 0,
);

export const START_MINT_TIMESTAMP = new Date(
  process.env.NEXT_PUBLIC_START_MINT_TIMESTAMP ?? 0,
);

export const ROUTES = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Status',
    path: '/status',
  },
];
