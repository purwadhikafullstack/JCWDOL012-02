import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

export const authorization = (req: Request, res: Response, next: NextFunction) => {
  const isAuthenticated = req.isAuthenticated();

  next();
};
