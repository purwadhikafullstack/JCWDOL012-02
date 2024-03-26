import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validatePostProduct = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('description').isString().notEmpty().withMessage('Description is required'),
  body('price').isNumeric().notEmpty().withMessage('Price is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('brand').isString().notEmpty().withMessage('Brand is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }
    next();
  },
];
