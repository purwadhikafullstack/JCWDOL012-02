import { Router } from 'express';
import { AuthRouter } from './auth.router';
import { UserRouter } from './user.router';
import { DataRouter } from './data.router';
import { AddressRouter } from './address.router';
import { requireUser } from '@/middleware/auth/authentication.middleware';

export class ApiRouter {
  private router: Router;
  private authRouter: AuthRouter;
  private userRouter: UserRouter;
  private addressRouter: AddressRouter;
  private dataRouter: DataRouter;

  constructor() {
    this.authRouter = new AuthRouter();
    this.userRouter = new UserRouter();
    this.addressRouter = new AddressRouter();
    this.dataRouter = new DataRouter();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/auth', this.authRouter.getRouter());
    this.router.use('/user', this.userRouter.getRouter());
    this.router.use('/user/address', requireUser, this.addressRouter.getRouter());
    this.router.use('/data', this.dataRouter.getRouter());
  }

  getRouter() {
    return this.router;
  }
}
