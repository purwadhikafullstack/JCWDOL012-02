import { NextFunction, Request, Response } from 'express';
import { configs } from '@/config';
import { generateOtp } from '@/helpers/otpGenerator';
import { ParsedToken } from '@/@types';
import { hashPassword } from '@/helpers/hashPassword.helper';
import { EmailType, sendEmail } from '@/utils/sendEmail';
import {
  getUserById,
  resetPasswordUser,
  setUserOtp,
  updateImageUser,
  updatePasswordUser,
  updateProfileUser,
} from '@/services/user.services';

export class UserController {
  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedToken = req.user as ParsedToken;
      const user = await getUserById(parsedToken.userId);
      return res.status(200).json({
        success: true,
        message: 'Login success',
        user: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateImage(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as ParsedToken;
      const { file } = req;
      const urlFile = configs.baseApiUrl + file?.path;
      const pushImage = await updateImageUser(user.userId, urlFile);
      return res.status(201).json({
        success: true,
        message: 'Update image success',
        image: pushImage.image,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as ParsedToken;
      const { name, phone, bio } = req.body;
      await updateProfileUser(user.userId, name, phone, bio);
      return res.status(201).json({
        success: true,
        message: 'Update profile success',
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as ParsedToken;
      const { newPassword } = req.body;
      const hashedNewPassword = hashPassword(newPassword);
      await updatePasswordUser(user.userId, hashedNewPassword);
      return res.status(201).json({
        success: true,
        message: 'Update password success',
      });
    } catch (error) {
      next(error);
    }
  }

  async requestResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const generatedOtp = generateOtp(6);
      await setUserOtp(email, generatedOtp);
      const resetPasswordUrl = `${configs.frontEnd.url}/reset-password?code=${generatedOtp}&email=${email}`;
      await sendEmail(email, resetPasswordUrl, EmailType.reset);
      return res.status(200).json({
        success: true,
        message: 'Check your email for reset your password',
      });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, newPassword } = req.body;
      const hashedPassword = hashPassword(newPassword);
      await resetPasswordUser(email, hashedPassword);
      return res.status(201).json({
        success: true,
        message: 'Reset password success',
      });
    } catch (error) {
      next(error);
    }
  }
}
