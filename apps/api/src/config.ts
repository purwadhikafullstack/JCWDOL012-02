import { config } from 'dotenv';
import { resolve } from 'path';

export const NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = NODE_ENV === 'development' ? '.env.development' : '.env';

config({ path: resolve(__dirname, `../${envFile}`) });
config({ path: resolve(__dirname, `../${envFile}.local`), override: true });

// Load all environment variables from .env file

export const PORT = process.env.PORT || 8000;
export const DATABASE_URL = process.env.DATABASE_URL || '';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// nodemailer
const NODEMAILER_HOST = process.env.NODEMAILER_HOST || 'smtp.gmail.com';
const NODEMAILER_USER = process.env.NODEMAILER_USER || '';
const NODEMAILER_PASS = process.env.NODEMAILER_PASS || '';
const NODEMAILER_PORT = process.env.NODEMAILER_PORT || 587;

// google oauth
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || '';

export const configs = {
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
