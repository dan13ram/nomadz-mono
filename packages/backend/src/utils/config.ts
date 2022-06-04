import dotenv from 'dotenv';

dotenv.config();

type ConfigType = {
  IS_PROD: boolean;
  MONGODB_URI: string;
  PORT: number;
  JWT_SECRET: string;
  CLOSE_WHITELIST_TIMESTAMP: Date;
};

export const CONFIG: ConfigType = {
  IS_PROD: true,
  MONGODB_URI: '',
  PORT: 5000,
  JWT_SECRET: '',
  CLOSE_WHITELIST_TIMESTAMP: new Date()
};

export const initConfig = () => {
  const { NODE_ENV, MONGODB_URI, PORT, JWT_SECRET, CLOSE_WHITELIST_TIMESTAMP } =
    process.env;

  if (!MONGODB_URI || !JWT_SECRET || !CLOSE_WHITELIST_TIMESTAMP) {
    throw new Error('Invalid ENV variables');
  }

  CONFIG.IS_PROD = NODE_ENV !== 'development';
  CONFIG.MONGODB_URI = MONGODB_URI;
  CONFIG.PORT = PORT ? Number(PORT) : 5000;
  CONFIG.JWT_SECRET = JWT_SECRET;
  CONFIG.CLOSE_WHITELIST_TIMESTAMP = new Date(CLOSE_WHITELIST_TIMESTAMP);
};
