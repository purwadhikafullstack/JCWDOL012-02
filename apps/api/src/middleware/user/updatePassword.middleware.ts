import { Request, Response, NextFunction } from 'express';
import { ParsedToken } from '@/@types';
import { getPasswordUser } from '@/services/user.services';
import { comparePassword } from '@/helpers/hashPassword.helper';

export const checkOldPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.user as ParsedToken;
  const { oldPassword } = req.body;
  const userPassword = await getPasswordUser(userId);
  const validPassword = comparePassword(oldPassword, userPassword?.password!);
  if (!validPassword) {
    return res.status(400).json({
      success: false,
      message: 'Wrong old password',
    });
  }
  next();
};
