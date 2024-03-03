import { getUserWithEmail } from '@/models/user.model';
import { Request, Response, NextFunction } from 'express';

export async function registerMiddleware(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;
  const exitingUser = await getUserWithEmail(email);
  if (exitingUser?.email === email) {
    return res.status(400).json({ success: false, message: 'Email already registered.' });
  }
  if (exitingUser?.LocalAuth?.confirmed === true) {
    return res.status(400).json({ success: false, message: 'This email is already registered' });
  }
  if (exitingUser?.LocalAuth?.confirmed === false) {
    return res.status(400).json({
      success: false,
      message: 'Your email is already registered, please verify your email',
    });
  }
  next();
}
