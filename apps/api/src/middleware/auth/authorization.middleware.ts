import { ParsedToken } from '@/@types';
import { NextFunction, Request, Response } from 'express';

export const authorizeSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as ParsedToken;
  if (user.role !== 'SuperAdmin') {
    return res.status(403).json({ success: false, message: 'Unauthorized access' });
  }
  next();
};

export const authorizeAdmin = (req: any, res: any, next: any) => {
  const { role } = req.user as ParsedToken;
  if (role === 'User') {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
};
