'use client';

import { updateAddress } from '@/services/address';
import { useMutation } from '@tanstack/react-query';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';
import { buttonVariants } from '../ui/button';
import AddressForm from './AddressForm';
import { Type } from '@/app/(account)/address/page';
import { useAddressStore } from '@/store/locationStore';

interface UpdateAddressProps {
  addressId: number;
}

export default function UpdateAddress(props: UpdateAddressProps) {
  const { addressId } = props;
  const { setStep } = useAddressStore();
  // const mutation = useMutation({
  //   mutationFn: () => updateAddress(),
  // });
  return (
    <Dialog onOpenChange={() => setStep(0)}>
      <DialogTrigger className={buttonVariants({ variant: 'default', size: 'icon', className: 'w-8 h-8' })}>
        <Pencil size={16} />
      </DialogTrigger>
      <AddressForm type={Type.Update} addressId={addressId} />
    </Dialog>
  );
}
