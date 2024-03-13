import { Router } from 'express';
import { requireUser } from '@/middleware/auth/authentication.middleware';
import { UserController } from '@/controllers/user.controller';
import { multerMiddleware } from '@/middleware/multer.middleware';
import { validateUpdatePassword, validateUpdateProfile } from '@/middleware/validator/userValidator';
import { validateResetPassword } from '@/middleware/validator/resetPasswordValidation';
import { confirmResetPassword, resetPassword } from '@/middleware/user/resetPassword.middleware';
import { checkOldPassword } from '@/middleware/user/updatePassword.middleware';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/me', requireUser, this.userController.me);

    this.router.put('/update/image', requireUser, multerMiddleware, this.userController.updateImage);
    this.router.put('/update/profile', requireUser, validateUpdateProfile, this.userController.updateProfile);
    this.router.put(
      '/update/password',
      requireUser,
      validateUpdatePassword,
      checkOldPassword,
      this.userController.updatePassword,
    );

    this.router.post('/reset-password/request', resetPassword, this.userController.requestResetPassword);
    this.router.put(
      '/reset-password/confirm',
      validateResetPassword,
      confirmResetPassword,
      this.userController.resetPassword,
    );
  }

  getRouter() {
    return this.router;
  }
}
