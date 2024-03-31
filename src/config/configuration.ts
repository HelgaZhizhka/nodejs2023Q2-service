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
  log: {
    maxFileSize: +process.env.LOG_MAX_FILE_SIZE * 1024,
    logLevel: process.env.LOG_LEVEL || 4,
  },
});
