import { hashPassword } from '@/helpers/hashPassword.helper';
import { generateOtp } from '@/helpers/otpGenerator';
import { resetPasswordUser, setUserOtp, updateImageUser, updateProfileUser } from '@/models/user.model';
import { EmailType, sendEmail } from '@/services/sendEmail';
import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { configs } from '@/config';

export class UserController {
  async profile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as User;
      if (!user) {
        return res.send('User not logged in');
      }

      return res.status(200).json({
        success: true,
        message: 'Login success',
        user: user,
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

  async updateNewPassword(req: Request, res: Response, next: NextFunction) {
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

  async updateImage(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as User;
      const { file } = req;
      const urlFile = configs.baseApiUrl + file?.path;
      const pushImage = await updateImageUser(user.email, urlFile);
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
      const user = req.user as User;
      const { name, phone, bio } = req.body;
      await updateProfileUser(user.email, name, phone, bio);
      return res.status(201).json({
        success: true,
        message: 'Update profile success',
      });
    } catch (error) {
      next(error);
    }
  }
}
