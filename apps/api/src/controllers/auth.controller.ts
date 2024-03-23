import { NextFunction, Request, Response } from 'express';
import dayjs from 'dayjs';
import generateConfirmation from '@/helpers/generateConfirmation.helper';
import { EmailType, sendEmail } from '@/utils/sendEmail';
import { ParsedToken, RegisterPayload, VerificationPayload } from '@/@types';
import { comparePassword, hashPassword } from '@/helpers/hashPassword.helper';
import { getUserWithEmail, resetPasswordUser, setUserOtp } from '@/services/user.services';
import { IRefreshTokenPayload, generateTokens, verifyRefreshToken } from '@/helpers/jwt.helper';
import {
  addRefreshToken,
  deleteRefreshToken,
  findRefreshToken,
  sendRefreshToken,
  setRegisteringUser,
  updateRegisteringUser,
} from '@/services/auth.services';
import { hashToken } from '@/helpers/hashToken';
import passport from 'passport';
import { callbackHelper } from '@/helpers/strategy.helper';
import { User } from '@prisma/client';
import { responseHandler } from '@/helpers/response';
import { generateOtp } from '@/helpers/otpGenerator';
import { configs } from '@/config';

export class AuthController {
  async registerEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email }: RegisterPayload = req.body;
      const generatedConfirmationCode = generateConfirmation(20, email, EmailType.verification);

      const expiresAt = dayjs().add(1, 'hour').toDate();

      await setRegisteringUser(email, expiresAt, generatedConfirmationCode.code);

      await sendEmail(email, generatedConfirmationCode.url.verificationUrl, EmailType.verification);

      return responseHandler(res, 201, true, 'Check your email for verification');
    } catch (error) {
      next(error);
    }
  }

  async emailVerification(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password }: VerificationPayload = req.body;
      const hashedPassword: string = hashPassword(password);

      await updateRegisteringUser(email, name, hashedPassword);

      return responseHandler(res, 201, true, 'Email verification success');
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const existingUser = await getUserWithEmail(email);
      if (!existingUser) return responseHandler(res, 400, false, 'Email not registered, please register first');

      if (existingUser.LocalAuth?.confirmed === false)
        return responseHandler(res, 400, false, 'Your email is not verified, Please verify your email');

      const validPassword = comparePassword(password, existingUser.LocalAuth?.password!);
      if (!validPassword) responseHandler(res, 400, false, 'Wrong password');

      const { accessToken, refreshToken } = generateTokens(existingUser.id, existingUser.email, existingUser.role);
      await addRefreshToken(refreshToken, existingUser.id);
      sendRefreshToken(res, refreshToken);
      return res.status(200).json({
        success: true,
        access_token: accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies['refreshToken'];
      if (!refreshToken) return res.status(401).send('Missing refresh token');

      const { userId, email, role } = verifyRefreshToken(refreshToken) as IRefreshTokenPayload;
      const savedRefreshToken = await findRefreshToken(userId);
      const hashedToken = hashToken(refreshToken);
      const refreshTokens = savedRefreshToken?.RefreshToken.map((token) => token.hashedToken);

      if (!refreshTokens?.includes(hashedToken)) return res.status(401).send('Unauthorized');

      const { accessToken } = generateTokens(userId, email, role);
      return res.status(200).send({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies['refreshToken'];
      const { userId } = req.user as ParsedToken;
      const hashedToken = hashToken(refreshToken);

      await deleteRefreshToken(userId, hashedToken);

      res.clearCookie('refreshToken');
      return responseHandler(res, 200, true, 'Logout success');
    } catch (error) {
      next(error);
    }
  }

  async googleCallback(req: Request, res: Response, next: NextFunction) {
    try {
      passport.authenticate('google', async (err: Error, user: User) => {
        callbackHelper(user, err, res, next);
      })(req, res);
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

      return responseHandler(res, 201, true, 'Check your email for reset your password');
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, newPassword } = req.body;
      const hashedPassword = hashPassword(newPassword);
      await resetPasswordUser(email, hashedPassword);

      responseHandler(res, 201, true, 'Reset password success');
    } catch (error) {
      next(error);
    }
  }
}
