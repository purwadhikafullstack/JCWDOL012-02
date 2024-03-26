import { configs } from '@/config';
import { responseHandler } from '@/helpers/response';
import { getAllProducts, postNewProduct } from '@/services/product.services';
import { Request, Response, NextFunction } from 'express';

export class ProductController {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await getAllProducts();

      if (!products) return responseHandler(res, 404, false, 'Products not found');

      return responseHandler(res, 200, true, 'Get products success', products);
    } catch (error) {}
  }

  async postProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, price, category, brand } = req.body;
      const { file } = req;
      const parsedPrice = parseInt(price);
      const urlFile = configs.baseApiUrl + file?.path;

      await postNewProduct({ name, description, price: parsedPrice, category, brand, image: urlFile });

      responseHandler(res, 201, true, 'Create product success');
    } catch (error) {
      next(error);
    }
  }
}
