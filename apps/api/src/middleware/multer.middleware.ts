import { uploadUserProfile } from '@/services/multer';
import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import multer from 'multer';

export const multerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  uploadUserProfile(req, res, function (err) {
    if (err) {
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File size should not exceed 1MB!' });
      }
      if (err.message === 'File type not allowed') {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: 'An error occurred during the upload process, please try again.' });
    }
    next();
  });
};
