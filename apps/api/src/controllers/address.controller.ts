import { Request, Response, NextFunction } from 'express';
import { ParsedToken } from '@/@types';
import {
  UpdateAddressPayload,
  addAddress,
  deleteAddress,
  getUserAddress,
  updateAddress,
} from '@/services/address.services';
import { matchedData, validationResult } from 'express-validator';
import { validateUpdateAddress } from '@/middleware/validator/addressValidation';

export class AddressController {
  async addNewAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as ParsedToken;
      const { latitude, longitude, label, recipientName, phoneNumber, provinceId, cityId, fullAddress, isMainAddress } =
        req.body;
      await addAddress({
        userId,
        latitude,
        longitude,
        label,
        recipientName,
        phoneNumber,
        provinceId,
        cityId,
        fullAddress,
        isMainAddress,
      });
      return res.status(201).json({
        success: true,
        message: 'Add new address success',
      });
    } catch (error) {
      next(error);
    }
  }

  async getAddresses(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as ParsedToken;
      const addresses = await getUserAddress(userId);
      return res.status(200).json({
        success: true,
        message: 'Get address success',
        addresses,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as ParsedToken;
      const { addressId } = req.params;
      const parsedAddressId = parseInt(addressId);
      await deleteAddress(userId, parsedAddressId);
      return res.status(200).json({
        success: true,
        message: 'Delete address success',
      });
    } catch (error) {
      next(error);
    }
  }

  async updateAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as ParsedToken;
      const { addressId } = req.params;
      const { ...data } = matchedData(req) as UpdateAddressPayload;
      const parsedAddressId = parseInt(addressId);
      await updateAddress(userId, parsedAddressId, data);
      return res.status(200).json({
        success: true,
        message: 'Update address success',
      });
    } catch (error) {
      next(error);
    }
  }
}
