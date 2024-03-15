'use client';

import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Type } from '@/app/(account)/address/page';
import AddressForm from './AddressForm';
import { useAddressStore } from '@/store/locationStore';

export default function AddNewAddress() {
  const { setStep } = useAddressStore();
  return (
    <Dialog onOpenChange={() => setStep(0)}>
      <DialogTrigger asChild>
        <Button size="sm" className="sm:space-x-2">
          <Plus size={18} className="sm:flex hidden" />
          <span>New Address</span>
        </Button>
      </DialogTrigger>
      <AddressForm type={Type.Add} />
    </Dialog>
  );
}
