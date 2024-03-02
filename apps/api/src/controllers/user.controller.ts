import { hashPassword } from '@/helpers/hashPassword.helper';
import { generateOtp } from '@/helpers/otpGenerator';
import { resetPasswordUser, setUserOtp } from '@/models/user.model';
import { EmailType, sendEmail } from '@/services/sendEmail';
import { User } from '@prisma/client';
import { Request, Response } from 'express';

export class UserController {
  async profile(req: Request, res: Response) {
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
      console.log(error);
    }
  }

  async sendResetPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const generatedOtp = generateOtp(6);
      await setUserOtp(email, generatedOtp);
      await sendEmail(email, generatedOtp, EmailType.reset);
      return res.status(200).json({
        success: true,
        message: 'Check your email for reset your password',
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateNewPassword(req: Request, res: Response) {
    try {
      const { email, newPassword } = req.body;
      const hashedPassword = hashPassword(newPassword);
      await resetPasswordUser(email, hashedPassword);

      return res.status(200).json({
        success: true,
        message: 'Reset password success',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
