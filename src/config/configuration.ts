import { APP_PORT_DEFAULT, DATABASE_PORT_DEFAULT } from '../utils/constants';

export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || APP_PORT_DEFAULT,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || DATABASE_PORT_DEFAULT,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    refreshSecretKey: process.env.JWT_SECRET_REFRESH_KEY,
    tokenExpireTime: process.env.TOKEN_EXPIRE_TIME,
    tokenRefreshExpireTime: process.env.TOKEN_REFRESH_EXPIRE_TIME,
  },
  crypt: {
    salt: +process.env.CRYPT_SALT || 10,
  },
  logging: {
    levels: process.env.LOGGING_LEVELS,
    maxFileSize: process.env.LOGGING_MAX_FILE_SIZE,
    nameLevels: ['debug', 'error', 'log', 'verbose', 'warn'],
  },
});
