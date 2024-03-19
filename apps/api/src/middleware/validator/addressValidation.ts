import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateNewAddress = [
  body('latitude').notEmpty().withMessage('Latitude is required'),
  body('longitude').notEmpty().withMessage('Longitude is required'),
  body('label').notEmpty().withMessage('Label is required'),
  body('recipientName').notEmpty().withMessage('Address name is required'),
  body('phoneNumber').notEmpty().withMessage('Phone number is required'),
  body('provinceId').notEmpty().withMessage('Province is required'),
  body('cityId').notEmpty().withMessage('City is required'),
  body('fullAddress').notEmpty().withMessage('Full address is required'),
  body('isMainAddress').isBoolean().optional(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }
    next();
  },
];

export const validateUpdateAddress = [
  body('latitude').notEmpty().withMessage('Latitude is required'),
  body('longitude').notEmpty().withMessage('Longitude is required'),
  body('label').notEmpty().withMessage('Label is required'),
  body('recipientName').notEmpty().withMessage('Address name is required'),
  body('phoneNumber').notEmpty().withMessage('Phone number is required'),
  body('provinceId').notEmpty().withMessage('Province is required'),
  body('cityId').notEmpty().withMessage('City is required'),
  body('fullAddress').notEmpty().withMessage('Full address is required'),
  body('isMainAddress').isBoolean().optional(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }
    next();
  },
];
