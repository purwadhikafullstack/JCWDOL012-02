import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  credentials: true,
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
