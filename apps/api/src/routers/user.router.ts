import { UserController } from '@/controllers/user.controller';
import { isAuthenticated } from '@/middleware/auth/authentication.middleware';
import { multerMiddleware } from '@/middleware/multer.middleware';
import { confirmResetPassword, resetPassword } from '@/middleware/user/resetPassword.middleware';
import { validateResetPassword } from '@/middleware/validator/resetPasswordValidation';
import { validateUpdateProfile } from '@/middleware/validator/userValidator';
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
    this.router.get('/profile', isAuthenticated, this.userController.profile);
    this.router.post('/update-image', isAuthenticated, multerMiddleware, this.userController.updateImage);
    this.router.put('/update-profile', isAuthenticated, validateUpdateProfile, this.userController.updateProfile);
    this.router.post('/reset-password/request', resetPassword, this.userController.requestResetPassword);
    this.router.put(
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
