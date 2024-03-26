import { Request, Response, NextFunction } from 'express';
import { ParsedToken } from '@/@types';
import { getPasswordUser } from '@/services/user.services';
import { comparePassword } from '@/helpers/hashPassword.helper';
import { responseHandler } from '@/helpers/response';

export const checkOldPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.user as ParsedToken;
  const { oldPassword } = req.body;

  const userPassword = await getPasswordUser(userId);
  const validPassword = comparePassword(oldPassword, userPassword?.password!);

  if (!validPassword) return responseHandler(res, 400, false, 'Wrong old password');
  next();
};
