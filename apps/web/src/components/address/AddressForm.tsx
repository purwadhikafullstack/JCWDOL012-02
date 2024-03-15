'use client';

import dynamic from 'next/dynamic';
import ChooseLocation from './ChooseLocation';
import { Type } from '@/app/(account)/address/page';
import { Separator } from '../ui/separator';
import { useAddressStore } from '@/store/locationStore';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

const AddressDetail = dynamic(() => import('./AddressDetail'), { ssr: false });
const steps = [{ title: 'Choose location' }, { title: 'Address details' }];

interface AddressFormProps {
  type: Type;
  addressId?: number;
}

export default function AddressForm(props: AddressFormProps) {
  const { type, addressId } = props;
  const { step } = useAddressStore();

  return (
    <DialogContent className="rounded-sm gap-2 lg:max-w-3xl md:max-w-2xl sm:max-w-xl max-w-[26rem] p-2">
      <DialogHeader className="items-center">
        <DialogTitle>{type === 'Add' ? 'Add New Address' : 'Update Address'}</DialogTitle>
        <div className="flex gap-4 text-[0.7rem] font-medium text-gray-700">
          {steps.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span
                className={`w-4 text-center h-4 rounded-full ${
                  step === index ? 'bg-green-700 text-white' : 'border border-green-700 text-green-700'
                }`}
              >
                {index + 1}
              </span>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </DialogHeader>
      <Separator className="bg-gray-700" />
      {step === 0 && <ChooseLocation />}
      {step === 1 && <AddressDetail type={type} addressId={addressId} />}
    </DialogContent>
  );
}
