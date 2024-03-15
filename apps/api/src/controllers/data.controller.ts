import { getCities, getProvinces } from '@/services/data.services';
import { NextFunction, Request, Response } from 'express';

export class DataController {
  async getAllCity(req: Request, res: Response, next: NextFunction) {
    try {
      const cities = await getCities();
      return res.status(200).json({
        success: true,
        message: 'Get all cities success',
        cities,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllProvince(req: Request, res: Response, next: NextFunction) {
    try {
      const provinces = await getProvinces();
      return res.status(200).json({
        success: true,
        message: 'Get all provinces success',
        provinces,
      });
    } catch (error) {
      next(error);
    }
  }
}
