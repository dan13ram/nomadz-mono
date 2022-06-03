import dotenv from 'dotenv';
import { utils } from 'ethers';

dotenv.config();

type ConfigType = {
  IS_PROD: boolean;
  MONGODB_URI: string;
  PORT: number;
  JWT_SECRET: string;
  NOMADZ_CONTRACT: string;
  CHAIN_ID: number;
  CLOSE_WHITELIST_TIMESTAMP: Date;
};

export const CONFIG: ConfigType = {
  IS_PROD: true,
  MONGODB_URI: '',
  PORT: 5000,
  JWT_SECRET: '',
  NOMADZ_CONTRACT: '',
  CHAIN_ID: 0,
  CLOSE_WHITELIST_TIMESTAMP: new Date()
};

export const initConfig = () => {
  const {
    NODE_ENV,
    MONGODB_URI,
    PORT,
    JWT_SECRET,
    NOMADZ_CONTRACT,
    INFURA_ID,
    CHAIN_ID,
    CLOSE_WHITELIST_TIMESTAMP
  } = process.env;

  if (
    !MONGODB_URI ||
    !JWT_SECRET ||
    !NOMADZ_CONTRACT ||
    !utils.isAddress(NOMADZ_CONTRACT) ||
    !INFURA_ID ||
    !CHAIN_ID ||
    !CLOSE_WHITELIST_TIMESTAMP ||
    Number.isNaN(Number(CHAIN_ID))
  ) {
    throw new Error('Invalid ENV variables');
  }

  CONFIG.IS_PROD = NODE_ENV !== 'development';
  CONFIG.MONGODB_URI = MONGODB_URI;
  CONFIG.PORT = PORT ? Number(PORT) : 5000;
  CONFIG.JWT_SECRET = JWT_SECRET;
  CONFIG.NOMADZ_CONTRACT = NOMADZ_CONTRACT;
  CONFIG.CHAIN_ID = Number(CHAIN_ID);
  CONFIG.CLOSE_WHITELIST_TIMESTAMP = new Date(CLOSE_WHITELIST_TIMESTAMP);
};
