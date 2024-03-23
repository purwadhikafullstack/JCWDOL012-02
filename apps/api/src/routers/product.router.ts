import { ProductController } from '@/controllers/product.controller';
import { authorizeAdmin } from '@/middleware/auth/authentication.middleware';
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
    this.router.post('/', authorizeAdmin, productImage, validatePostProduct, this.productController.postProduct);
  }

  getRouter() {
    return this.router;
  }
}
