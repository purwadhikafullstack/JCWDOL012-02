import { Router } from 'express';
import { DataController } from '@/controllers/data.controller';

export class DataRouter {
  private router: Router;
  private dataController: DataController;

  constructor() {
    this.dataController = new DataController();
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/cities', this.dataController.getAllCity);
    this.router.get('/provinces', this.dataController.getAllProvince);
  }

  getRouter() {
    return this.router;
  }
}
