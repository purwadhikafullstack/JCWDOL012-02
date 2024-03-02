import { Request, Response, NextFunction } from 'express';

export const googleAuth = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  console.log(user);
};
