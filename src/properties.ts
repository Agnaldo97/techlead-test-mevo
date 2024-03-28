import dotenv from 'dotenv';

dotenv.config();

export default {
  DATABASE: {
    MEVO: {
      USERNAME: process.env.LABOR_DATABASE_USERNAME || 'mevo_user',
      PASSWORD: process.env.LABOR_DATABASE_PASSWORD || 'mevo_password',
      NAME: process.env.LABOR_DATABASE_CATALOG || 'mevo',
      HOST: process.env.LABOR_DATABASE_HOST || 'localhost',
      PORT: process.env.LABOR_DATABASE_PORT || '3306',
    }
  },
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 4000
};