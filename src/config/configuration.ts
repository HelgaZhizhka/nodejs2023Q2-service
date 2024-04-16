import { APP_PORT_DEFAULT, DATABASE_PORT_DEFAULT } from '../utils/constants';

export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || APP_PORT_DEFAULT,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || DATABASE_PORT_DEFAULT,
  },
});
