'use client';

import dynamic from 'next/dynamic';
const Map = dynamic(() => import('./Map'), { ssr: false });

export default function OpenCageMap() {
  return (
    <div>
      <Map />
    </div>
  );
}
