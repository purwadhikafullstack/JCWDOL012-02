import { hashPassword } from '@/helpers/hashPassword.helper';
import { responseHandler } from '@/helpers/response';
import { createAdminData, deleteAdminData, updateAdminData } from '@/services/admin.services';
import { getUsers, getUserWithEmail } from '@/services/user.services';
import { EmailType, sendEmail } from '@/utils/sendEmail';
import { Request, Response, NextFunction } from 'express';

export class AdminController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { users, warehouseAdmin } = await getUsers();

      const result = { users, warehouseAdmin };

      return responseHandler(res, 200, true, 'Get all users success', result);
    } catch (error) {
      next(error);
    }
  }

  async addNewAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const existUser = await getUserWithEmail(email);
      if (existUser) return responseHandler(res, 400, false, 'Email already exist');
      const hashedPassword = hashPassword(password);
      await createAdminData({ name, email, password: hashedPassword });

      await sendEmail(email, '', EmailType.notification);

      return responseHandler(res, 201, true, 'Create new admin success');
    } catch (error) {
      next(error);
    }
  }

  async deleteAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;
      const existUser = await getUserWithEmail(email);
      if (existUser?.role === 'User') return responseHandler(res, 400, false, 'User cannot be deleted');

      await deleteAdminData(email);

      return responseHandler(res, 201, true, 'Delete admin success');
    } catch (error) {
      next(error);
    }
  }

  async updateAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const id = parseInt(req.params.id);

      const hashedPassword = hashPassword(password);
      await updateAdminData({ id, name, email, password: hashedPassword });

      return responseHandler(res, 201, true, 'Update admin success');
    } catch (error) {
      console.log(error);
    }
  }
}
