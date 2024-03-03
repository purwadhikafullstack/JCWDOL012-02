import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateResetPassword = [
  body('email').notEmpty().withMessage('Email is required'),
  body('newPassword').notEmpty().withMessage('New password is required'),
  body('code').notEmpty().withMessage('Code is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }
    next();
  },
];
