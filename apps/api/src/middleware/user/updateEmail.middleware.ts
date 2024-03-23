import { ParsedToken } from '@/@types';
import { responseHandler } from '@/helpers/response';
import { getUserWithId } from '@/services/user.services';
import { Request, Response, NextFunction } from 'express';

export const verifyUpdateEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.user as ParsedToken;
  const { code } = req.body;
  const existingUser = await getUserWithId(userId);
  const date = existingUser?.LocalAuth?.confirmationTimeStamp;
  const expireDate = new Date(date!).toISOString();
  if (new Date().toISOString() > expireDate) {
    return responseHandler(res, 400, false, 'This link has been expired, pleace send new verification email');
  }
  if (existingUser?.LocalAuth?.confirmationCode !== code) {
    return responseHandler(res, 400, false, 'Verification code is not valid');
  }
  next();
};
