import { NextFunction, Request, Response } from 'express';
import { configs } from '@/config';
import { ParsedToken } from '@/@types';
import { hashPassword } from '@/helpers/hashPassword.helper';
import {
  getExistingEmail,
  getUserById,
  getUserEmail,
  setUpdateEmail,
  updateEmailUser,
  updateImageUser,
  updatePasswordUser,
  updateProfileUser,
} from '@/services/user.services';
import { responseHandler } from '@/helpers/response';
import { EmailType, sendEmail } from '@/utils/sendEmail';
import generateConfirmation from '@/helpers/generateConfirmation.helper';
import dayjs from 'dayjs';

export class UserController {
  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as ParsedToken;
      const user = await getUserById(userId);

      if (!user) {
        res.clearCookie('refreshToken');
        return responseHandler(res, 404, false, 'User not found');
      }

      return responseHandler(res, 200, true, 'Login success', user);
    } catch (error) {
      next(error);
    }
  }

  async updateImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as ParsedToken;
      const { file } = req;
      const urlFile = configs.baseApiUrl + file?.path;
      await updateImageUser(userId, urlFile);

      return responseHandler(res, 201, true, 'Update image success');
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as ParsedToken;
      const { name, phone, bio } = req.body;
      await updateProfileUser(userId, name, phone, bio);

      return responseHandler(res, 201, true, 'Update profile success');
    } catch (error) {
      next(error);
    }
  }

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as ParsedToken;
      const { newPassword } = req.body;
      const hashedNewPassword = hashPassword(newPassword);
      await updatePasswordUser(userId, hashedNewPassword);

      return responseHandler(res, 201, true, 'Update password success');
    } catch (error) {
      next(error);
    }
  }

  async requestUpdateEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as ParsedToken;
      const { email } = req.body;
      const existingEmail = await getExistingEmail(email);
      if (existingEmail?.email) return responseHandler(res, 400, false, 'Email already exists');

      const { url, code } = generateConfirmation(20, email, EmailType.updateEmail);
      const expiresAt = dayjs().add(1, 'day').toDate();
      await sendEmail(email, url.updateEmail, EmailType.updateEmail);

      await setUpdateEmail(userId, email, expiresAt, code);
      return responseHandler(res, 201, true, 'Send email success, check your email');
    } catch (error) {
      next(error);
    }
  }

  async verifyUpdateEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as ParsedToken;
      const { email } = req.body;

      await updateEmailUser(userId, email);
      res.clearCookie('refreshToken');
      return responseHandler(res, 201, true, 'Update email success, login with new email');
    } catch (error) {
      next(error);
    }
  }

  async getEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as ParsedToken;
      const email = await getUserEmail(userId);
      return responseHandler(res, 200, true, 'Get email success', email);
    } catch (error) {
      next(error);
    }
  }
}
