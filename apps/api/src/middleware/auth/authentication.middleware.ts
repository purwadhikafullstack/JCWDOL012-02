import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    res.clearCookie('session');
    return res.status(401).json({
      success: false,
      message: 'Unauthorized access',
    });
  }

  next();
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as User;
  if (user.role !== 'SuperAdmin') {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized access',
    });
  }
  next();
};
