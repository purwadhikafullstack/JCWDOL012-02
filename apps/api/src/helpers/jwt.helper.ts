import * as jwt from 'jsonwebtoken';
import { configs } from '@/config';

export interface IAccessTokenPayload {
  userId: number;
  role: string;
}

export interface IRefreshTokenPayload {
  userId: number;
  email: string;
  role: string;
}

export function generateAccessToken(payload: IAccessTokenPayload): string {
  return jwt.sign(payload, configs.jwt.access.secret!, { expiresIn: '10m' });
}

export function generateRefreshToken(payload: IRefreshTokenPayload) {
  return jwt.sign(payload, configs.jwt.refresh.secret!, {
    expiresIn: '30d',
    algorithm: 'HS256',
  });
}

export function generateTokens(userId: number, email: string, role: string) {
  const accessTokenPayload: IAccessTokenPayload = {
    userId: userId,
    role: role,
  };
  const refreshTokenPayload: IRefreshTokenPayload = {
    userId: userId,
    email: email,
    role: role,
  };
  const accessToken = generateAccessToken(accessTokenPayload);
  const refreshToken = generateRefreshToken(refreshTokenPayload);
  return { accessToken, refreshToken };
}

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, configs.jwt.access.secret!) as IAccessTokenPayload;
  } catch (error) {
    throw error;
  }
}

export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, configs.jwt.refresh.secret!, {
      algorithms: ['HS256'],
    });
  } catch (error) {
    throw error;
  }
}
