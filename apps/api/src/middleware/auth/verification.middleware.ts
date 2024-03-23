import { getUserWithEmail } from '@/services/user.services';
import { NextFunction, Request, Response } from 'express';

export const verifyRegister = async (req: Request, res: Response, next: NextFunction) => {
  const { email, code } = req.body;
  const existingUser = await getUserWithEmail(email);
  const date = existingUser?.LocalAuth?.confirmationTimeStamp;
  const expireDate = new Date(date!).toISOString();
  if (new Date().toISOString() > expireDate) {
    return res.status(400).json({
      seccess: false,
      message: 'This link has been expired, pleace send new verification email',
    });
  }
  if (existingUser?.LocalAuth?.confirmationCode !== code) {
    return res.status(400).json({
      success: false,
      message: 'Verification code is not valid',
    });
  }
  next();
};
