import prisma from '@/prisma';
import { hashToken } from '@/helpers/hashToken';
import { Response } from 'express';

export const addRefreshToken = async (token: string, userId: number) => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      RefreshToken: {
        create: {
          hashedToken: hashToken(token),
        },
      },
    },
  });
};

export const createNewGoogleUser = async (email: string, name: string, image?: string | undefined) => {
  return await prisma.user.create({
    data: {
      email: email,
      name: name,
      image: image,
      authType: 'Google',
      SocialAuth: { create: { email: email, service: 'google' } },
    },
  });
};

export const setRegisteringUser = async (email: string, expiresAt: Date, code: string) => {
  return await prisma.user.create({
    data: {
      email: email as string,
      authType: 'Local',
      LocalAuth: {
        create: { email: email as string, confirmationCode: code, confirmationTimeStamp: expiresAt },
      },
    },
  });
};

export const updateRegisteringUser = async (email: string, name: string, hashedPassword: string) => {
  await prisma.user.update({
    where: { email },
    data: { name, email, LocalAuth: { update: { password: hashedPassword, confirmed: true } } },
  });
};

export const findRefreshToken = async (userId: number) => {
  return await prisma.user.findUnique({ where: { id: userId }, include: { RefreshToken: true } });
};

export function sendRefreshToken(res: Response, refreshToken: string) {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
}

export const deleteRefreshToken = async (userId: number, token: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      RefreshToken: {
        deleteMany: {
          hashedToken: {
            in: [token],
          },
        },
      },
    },
  });
};
