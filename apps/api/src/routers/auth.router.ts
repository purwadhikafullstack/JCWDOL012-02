import { Router } from 'express';
import passport from 'passport';
import { AuthController } from '@/controllers/auth.controller';
import { verifyRegister } from '@/middleware/auth/verification.middleware';
import { validateLogin, validateRegister, validateVerifyRegister } from '@/middleware/validator/authValidation';
import { registerEmailMiddleware } from '@/middleware/auth/registerEmail.middleware';
import { loginMiddleware } from '@/middleware/auth/login.middleware';
import { confirmResetPassword, resetPassword } from '@/middleware/user/resetPassword.middleware';
import { validateResetPassword } from '@/middleware/validator/resetPasswordValidation';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    //  LOCAL AUTH
    this.router.post('/register/email', validateRegister, registerEmailMiddleware, this.authController.registerEmail);
    this.router.post('/register/verify', validateVerifyRegister, verifyRegister, this.authController.emailVerification);
    this.router.post('/login', validateLogin, loginMiddleware, this.authController.login);
    this.router.post('/refresh', this.authController.refreshToken);
    this.router.post('/logout', this.authController.logout);

    // GOOGLE AUTH
    this.router.get('/google', passport.authenticate('google'));
    this.router.get('/google/callback', this.authController.googleCallback);

    // RESER PASSWORD
    this.router.post('/reset-password/request', resetPassword, this.authController.requestResetPassword);
    this.router.put(
      '/reset-password/confirm',
      validateResetPassword,
      confirmResetPassword,
      this.authController.resetPassword,
    );
  }
  getRouter(): Router {
    return this.router;
  }
}
