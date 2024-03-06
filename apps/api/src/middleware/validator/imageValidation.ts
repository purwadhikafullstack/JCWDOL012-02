import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateImageUpdate = [
  body('image').notEmpty().withMessage('Image is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }
    next();
  },
];
