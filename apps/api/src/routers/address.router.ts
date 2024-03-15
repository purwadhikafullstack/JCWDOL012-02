import { Router } from 'express';
import { AddressController } from '@/controllers/address.controller';
import { validateNewAddress, validateUpdateAddress } from '@/middleware/validator/addressValidation';

export class AddressRouter {
  private router: Router;
  private addressController: AddressController;
  constructor() {
    this.addressController = new AddressController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', validateNewAddress, this.addressController.addNewAddress);
    this.router.get('/', this.addressController.getAddresses);
    this.router.put('/:addressId', validateUpdateAddress, this.addressController.updateAddress);
    this.router.delete('/:addressId', this.addressController.deleteAddress);
  }

  getRouter() {
    return this.router;
  }
}
