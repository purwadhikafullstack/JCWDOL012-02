import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateUpdateProfile = [
  body('name').isString().optional(),
  body('phone').isString().optional(),
  body('bio').isString().optional(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }
    next();
  },
];

export const validateUpdatePassword = [
  body('oldPassword').isString().optional(),
  body('newPassword').isString().optional(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }
    next();
  },
];
