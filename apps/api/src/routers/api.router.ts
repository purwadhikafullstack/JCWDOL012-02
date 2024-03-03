import { Router } from 'express';
import { LocalAuthRouter } from './authLocal.router';
import { UserRouter } from './user.router';
import { SocialAuthRouter } from './authSocial.router';

export class ApiRouter {
  private router: Router;
  private localAuthRouter: LocalAuthRouter;
  private socialAuthRouter: SocialAuthRouter;
  private userRouter: UserRouter;

  constructor() {
    this.localAuthRouter = new LocalAuthRouter();
    this.socialAuthRouter = new SocialAuthRouter();
    this.userRouter = new UserRouter();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/auth/local', this.localAuthRouter.getRouter());
    this.router.use('/auth/social', this.socialAuthRouter.getRouter());
    this.router.use('/user', this.userRouter.getRouter());
  }

  getRouter() {
    return this.router;
  }
}
