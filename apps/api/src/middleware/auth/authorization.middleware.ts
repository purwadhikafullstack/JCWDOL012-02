import { ParsedToken } from '@/@types';

export const authorizeAdmin = (req: any, res: any, next: any) => {
  const { role } = req.user as ParsedToken;
  if (role === 'User') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
};
