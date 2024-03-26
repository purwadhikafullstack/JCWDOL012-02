import { AdminController } from '@/controllers/admin.controller';
import { authorizeAdmin } from '@/middleware/auth/authorization.middleware';
import { validateNewAdmin, validateUpdateAdmin } from '@/middleware/validator/adminValidation';
import { Router } from 'express';

export class AdminRouter {
  private router: Router;
  private adminController: AdminController;

  constructor() {
    this.adminController = new AdminController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/user-management/users', authorizeAdmin, this.adminController.getAllUsers);
    this.router.post('/user-management/admin', authorizeAdmin, validateNewAdmin, this.adminController.addNewAdmin);
    this.router.delete('/user-management/admin/:email', authorizeAdmin, this.adminController.deleteAdmin);
    this.router.put(
      '/user-management/admin/:id',
      authorizeAdmin,
      validateUpdateAdmin,
      this.adminController.updateAdmin,
    );
  }

  getRouter() {
    return this.router;
  }
}
