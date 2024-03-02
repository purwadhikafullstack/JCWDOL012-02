import { UserController } from '@/controllers/user.controller';
import { authorization } from '@/middleware/auth/authentication.middleware';
import { confirmResetPassword, resetPassword } from '@/middleware/user/resetPassword.middleware';
import { validateResetPassword } from '@/middleware/validator/resetPasswordValidation';
import { Router } from 'express';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/profile', this.userController.profile);
    this.router.post('/reset-password', resetPassword, this.userController.sendResetPassword);
    this.router.post(
      '/reset-password/confirm',
      validateResetPassword,
      confirmResetPassword,
      this.userController.updateNewPassword,
    );
  }

  getRouter() {
    return this.router;
  }
}
