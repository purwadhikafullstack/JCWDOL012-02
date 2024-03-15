'use client';

import dynamic from 'next/dynamic';
import AddNewAddress from '@/components/address/AddNewAddress';
import { useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { useDataStore } from '@/store/dataStore';

const AddressList = dynamic(() => import('@/components/address/AddressList'), { ssr: false });

export enum Type {
  Add = 'Add',
  Update = 'Update',
}

export default function Address() {
  const { getCities, getProvinces } = useDataStore();

  useEffect(() => {
    getCities();
    getProvinces();
  }, [getCities, getProvinces]);

  return (
    <div className="flex flex-col w-full h-auto backdrop-blur-md md:p-4 p-2 space-y-4 shadow-lg shadow-gray-200/80 border rounded-md">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">My Address</h1>
        <AddNewAddress />
      </div>
      <Separator />
      <div className="flex flex-col w-full">
        <AddressList />
      </div>
    </div>
  );
}
