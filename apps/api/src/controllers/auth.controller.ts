import { NextFunction, Request, Response } from 'express';
import dayjs from 'dayjs';
import generateConfirmation from '@/helpers/generateConfirmation.helper';
import { EmailType, sendEmail } from '@/utils/sendEmail';
import { ParsedToken, RegisterPayload, VerificationPayload } from '@/@types';
import { comparePassword, hashPassword } from '@/helpers/hashPassword.helper';
import { getUserWithEmail } from '@/services/user.services';
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

export class AuthController {
  async registerEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email }: RegisterPayload = req.body;
      const generatedConfirmationCode = generateConfirmation(20, email, EmailType.verification);
      const expiresAt = dayjs().add(1, 'hour').toDate();
      await setRegisteringUser(email, expiresAt, generatedConfirmationCode.code);
      await sendEmail(email, generatedConfirmationCode.url, EmailType.verification);
      return res
        .status(201)
        .json({ success: true, message: 'Check email inbox for confirmation, if not found please check spam.' });
    } catch (error) {
      next(error);
    }
  }

  async emailVerification(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password }: VerificationPayload = req.body;
      const hashedPassword: string = hashPassword(password);
      await updateRegisteringUser(email, name, hashedPassword);
      return res.status(201).json({
        success: true,
        message: 'Congratulations, your account has been verified, please log in',
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const existingUser = await getUserWithEmail(email);
      if (!existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User not found',
        });
      }
      if (existingUser.LocalAuth?.confirmed === false) {
        return res.status(400).json({
          success: false,
          message: 'Your email is not verified, Please verify your email',
        });
      }
      const validPassword = comparePassword(password, existingUser.LocalAuth?.password!);
      if (!validPassword) {
        return res.status(400).json({
          success: false,
          message: 'Wrong email or password',
        });
      }
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
      if (!refreshToken) {
        return res.status(401).send('Missing refresh token');
      }
      const { userId, email, role } = verifyRefreshToken(refreshToken) as IRefreshTokenPayload;
      const savedRefreshToken = await findRefreshToken(userId);
      const hashedToken = hashToken(refreshToken);
      const refreshTokens = savedRefreshToken?.RefreshToken.map((token) => token.hashedToken);
      if (!refreshTokens?.includes(hashedToken)) {
        return res.status(401).send('Unauthorized');
      }
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
      return res.status(200).send({
        success: true,
        message: 'Logout success',
      });
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
}
