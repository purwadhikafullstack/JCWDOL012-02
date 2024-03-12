import { SessionOptions } from 'express-session';

export const sessionOptions: SessionOptions = {
  name: 'session',
  secret: 'megatronics',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
};
