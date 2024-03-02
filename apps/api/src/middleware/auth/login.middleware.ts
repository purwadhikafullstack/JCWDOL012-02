import { getUserWithEmail } from '@/models/user.model';
import { Request, Response, NextFunction } from 'express';

export async function loginMiddleware(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;
  const user = await getUserWithEmail(email);
  if (!user || !user.LocalAuth)
    return res.status(400).json({
      success: false,
      message: 'Email not registered, please register first',
    });
  if (user.LocalAuth.confirmed === false)
    return res.status(400).json({
      success: false,
      message: 'Please verify your email',
    });
  next();
}
