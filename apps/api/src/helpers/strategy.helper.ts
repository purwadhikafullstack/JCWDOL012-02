import { configs } from '@/config';
import { getUserWithEmail } from '@/services/user.services';
import { NextFunction, Response } from 'express';
import { Profile, VerifyCallback } from 'passport-google-oauth20';
import { generateTokens } from './jwt.helper';
import { User } from '@prisma/client';
import { addRefreshToken, createNewGoogleUser, sendRefreshToken } from '@/services/auth.services';

export const strategyHelper = async (profile: Profile, done: VerifyCallback) => {
  try {
    const email = profile?._json.email;
    const user = await getUserWithEmail(email!);
    if (!user) {
      const newUser = await createNewGoogleUser(email!, profile?._json.name!, profile?._json.picture);
      return done(null, newUser);
    } else {
      done(null, user);
    }
  } catch (error) {
    throw error;
  }
};

export const callbackHelper = async (user: User, err: Error, res: Response | any, next: NextFunction) => {
  if (!user) return res.redirect(`${configs.frontEnd.url}/login?error=Social authentication failed`);
  if (err) next(err);
  const { accessToken, refreshToken } = generateTokens(user.id, user.email, user.role);
  await addRefreshToken(refreshToken, user.id);
  sendRefreshToken(res, refreshToken);
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: configs.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'none',
    path: '/',
  }); // 7 days
  res.redirect(`${configs.frontEnd.url}/login?accessToken=${accessToken}`);
};
