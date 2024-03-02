import { Router } from 'express';
import passport from 'passport';

export class SocialAuthRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/google', passport.authenticate('google'));
    this.router.get(
      '/google/callback',
      passport.authenticate('google', {
        successRedirect: 'http://localhost:3000',
        failureRedirect: 'http://localhost:8000/api/auth/social/google/error',
        failureMessage: true,
        passReqToCallback: true,
      }),
    );
  }
  getRouter(): Router {
    return this.router;
  }
}
