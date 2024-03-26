import { configs } from '@/config';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (accessToken === undefined) {
      return next();
    }
    jwt.verify(accessToken, configs.jwt.access.secret!, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(403).send('Token expired');
        }
        return res.status(401).send('Invalid token');
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(403).send('Unauthorized');
    }
    next();
  } catch (error) {
    next(error);
  }
};
