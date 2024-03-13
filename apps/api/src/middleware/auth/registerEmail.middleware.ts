import { getUserWithEmail } from '@/services/user.services';
import { Request, Response, NextFunction } from 'express';

export async function registerEmailMiddleware(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;
  const exitingUser = await getUserWithEmail(email);
  if (exitingUser?.email === email) {
    return res.status(400).json({ success: false, message: 'Email already registered.' });
  }
  if (exitingUser?.LocalAuth?.confirmed === false) {
    return res.status(400).json({
      success: false,
      message: 'Your email is already registered but not verified, please verify your email',
    });
  }
  next();
}
