import { Router } from 'express';
import passport from 'passport';
import { LocalAuthController } from '@/controllers/localAuth.controller';
import { verifyRegister } from '@/middleware/auth/verification.middleware';
import { validateLogin, validateRegister, validateVerifyRegister } from '@/middleware/validator/authValidation';
import { registerMiddleware } from '@/middleware/auth/register.middleware';

export class LocalAuthRouter {
  private router: Router;
  private localAuthController: LocalAuthController;

  constructor() {
    this.localAuthController = new LocalAuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register', validateRegister, registerMiddleware, this.localAuthController.register);
    this.router.post(
      '/verify-register',
      validateVerifyRegister,
      verifyRegister,
      this.localAuthController.emailVerification,
    );

    this.router.post(
      '/login',
      validateLogin,
      passport.authenticate('local', {
        successRedirect: 'http://localhost:8000/api/user/profile',
        failureRedirect: 'http://localhost:8000/api/auth/local/error-login',
        failureMessage: true,
        passReqToCallback: true,
      }),
    );

    this.router.post('/logout', this.localAuthController.logout);
    this.router.get('/error-login', (req, res) => {
      const { messages }: any = req.session;
      res.send({
        success: false,
        message: messages[0],
      });
    });
  }
  getRouter(): Router {
    return this.router;
  }
}
