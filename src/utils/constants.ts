export const APP_PORT_DEFAULT = 4000;
export const DATABASE_PORT_DEFAULT = 5432;
export const DOC_FILENAME = 'api.yaml';
export const DOC_PATH = '../doc';
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME;
export const JWT_SECRET_REFRESH_KEY = process.env.JWT_SECRET_REFRESH_KEY;
export const TOKEN_REFRESH_EXPIRE_TIME = process.env.TOKEN_REFRESH_EXPIRE_TIME;
// export const JWT_SETTINGS = {
//   secret: process.env.JWT_SECRET_KEY,
//   expiresIn: process.env.TOKEN_EXPIRE_TIME,
//   refreshSecret: process.env.JWT_SECRET_REFRESH_KEY,
//   refreshExpiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
// };
export const MAX_FILE_SIZE = process.env.MAX_FILE_SIZE;
export const LOGGING_LEVELS = process.env.LOGGING_LEVELS;
export const LOGGING_NAME_LEVELS = ['debug', 'error', 'log', 'verbose', 'warn'];