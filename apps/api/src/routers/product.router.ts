import { ProductController } from '@/controllers/product.controller';
import { authorizeSuperAdmin } from '@/middleware/auth/authorization.middleware';
import { productImage } from '@/middleware/multer.middleware';
import { validatePostProduct } from '@/middleware/validator/productValidation';
import { Router } from 'express';

export class ProductRouter {
  private productController = new ProductController();
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.productController.getProducts);
    this.router.post('/', authorizeSuperAdmin, productImage, validatePostProduct, this.productController.postProduct);
  }

  getRouter() {
    return this.router;
  }
}
