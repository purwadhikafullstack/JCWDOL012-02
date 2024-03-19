'use client';

import dynamic from 'next/dynamic';
import { Button } from '../ui/button';
import { useAddressStore } from '@/store/locationStore';
const Map = dynamic(() => import('./Map'), { ssr: false });

export default function ChooseLocation() {
  const { setStep } = useAddressStore();
  return (
    <div className="flex flex-col w-full md:h-[400px] h-[260px] gap-2">
      <Map />
      <Button size="sm" className="w-20 place-self-end" onClick={() => setStep(1)}>
        Next
      </Button>
    </div>
  );
}
