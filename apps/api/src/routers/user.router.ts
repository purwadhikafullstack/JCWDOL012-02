import { Router } from 'express';
import { requireUser } from '@/middleware/auth/authentication.middleware';
import { UserController } from '@/controllers/user.controller';
import { multerMiddleware } from '@/middleware/multer.middleware';
import { checkOldPassword } from '@/middleware/user/updatePassword.middleware';
import { validateUpdatePassword, validateUpdateProfile } from '@/middleware/validator/userValidator';
import { verifyUpdateEmail } from '@/middleware/user/updateEmail.middleware';

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
    this.router.get('/email', this.userController.getEmail);

    this.router.put('/update/image', requireUser, multerMiddleware, this.userController.updateImage);
    this.router.put('/update/profile', requireUser, validateUpdateProfile, this.userController.updateProfile);
    this.router.post('/update/email/request', requireUser, this.userController.requestUpdateEmail);
    this.router.put('/update/email/verify', requireUser, verifyUpdateEmail, this.userController.verifyUpdateEmail);
    this.router.put(
      '/update/password',
      requireUser,
      validateUpdatePassword,
      checkOldPassword,
      this.userController.updatePassword,
    );
  }

  getRouter() {
    return this.router;
  }
}
