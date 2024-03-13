import { config } from 'dotenv';
import { resolve } from 'path';

export const NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = NODE_ENV === 'development' ? '.env.development' : '.env';

config({ path: resolve(__dirname, `../${envFile}`) });
config({ path: resolve(__dirname, `../${envFile}.local`), override: true });

// Load all environment variables from .env file

export const PORT = process.env.PORT || 8000;
export const DATABASE_URL = process.env.DATABASE_URL || '';
export const BASE_API_URL = process.env.BASE_API_URL || 'http://localhost:8000/api/';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// jwt
const JWT_ACCESS_LIFETIME = process.env.JWT_ACCESS_LIFETIME || '';
const JWT_REFRESH_LIFETIME = process.env.JWT_REFRESH_LIFETIME || '';
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || '';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '';

// nodemailer
const NODEMAILER_HOST = process.env.NODEMAILER_HOST || '';
const NODEMAILER_USER = process.env.NODEMAILER_USER || '';
const NODEMAILER_PASS = process.env.NODEMAILER_PASS || '';
const NODEMAILER_PORT = process.env.NODEMAILER_PORT || 587;

// google oauth
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || '';

export const configs = {
  NODE_ENV,
  port: PORT,
  baseApiUrl: BASE_API_URL,
  jwt: {
    access: {
      lifetime: JWT_ACCESS_LIFETIME,
      secret: JWT_ACCESS_SECRET,
    },
    refresh: {
      lifetime: JWT_REFRESH_LIFETIME,
      secret: JWT_REFRESH_SECRET,
    },
  },
  frontEnd: {
    url: FRONTEND_URL,
  },
  nodeMailer: {
    host: NODEMAILER_HOST,
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS,
    port: NODEMAILER_PORT,
  },
  google: {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackUrl: GOOGLE_CALLBACK_URL,
  },
};
