'use client';

import { Separator } from '@/components/ui/separator';
import { useSessionStore } from '@/utils/SessionProvider';

export default function Address() {
  const { user } = useSessionStore((state) => state);

  return (
    <div className="flex flex-col w-full h-auto backdrop-blur-md p-4 space-y-4 shadow-lg shadow-gray-200/80 border rounded-md">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">Shipping Address</h1>
        <p className="text-sm text-gray-700">
          Feel free to edit any of your details below so your Basic.Space account is always up to date.
        </p>
      </div>
      <Separator />
    </div>
  );
}
