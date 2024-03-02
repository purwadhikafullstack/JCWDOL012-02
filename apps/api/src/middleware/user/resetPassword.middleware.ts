import { getUserWithEmail } from '@/models/user.model';
import { Request, Response, NextFunction } from 'express';

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const user = await getUserWithEmail(email);
  if (user?.authType !== 'Local') {
    return res.status(400).json({
      success: false,
      message: 'Reset password is only available for local credentials',
    });
  }
  next();
};

export const confirmResetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { email, code } = req.body;
  const user = await getUserWithEmail(email);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'User not found',
    });
  }
  if (user.LocalAuth?.otpCode !== code) {
    return res.status(400).json({
      success: false,
      message: 'Invalid code',
    });
  }
  next();
};
