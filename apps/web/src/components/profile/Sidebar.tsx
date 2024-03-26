'use client';

import React, { useState } from 'react';
import { useSessionStore } from '@/utils/SessionProvider';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import AvatarProfile from '../AvatarProfile';
import { Banknote, Package, PanelLeftOpen, PanelRightOpen, ShoppingCart, Truck, User } from 'lucide-react';
import SidebarLink from './SidebarLink';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const { user } = useSessionStore((state) => state);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (!user) {
    router.push('/');
  }

  return (
    <div
      className={`lg:flex lg:relative absolute bg-background shadow-lg shadow-gray-200/80 lg:-translate-x-0 ease-in transition-all flex-col w-[320px] lg:max-w-[320px] max-w-[350px] min-h-full p-4 gap-2 border rounded-md backdrop-blur-2xl justify-between z-20 ${
        isOpen ? '-translate-x-0' : '-translate-x-[400px]'
      } `}
    >
      <Button
        onClick={handleOpenSidebar}
        variant="default"
        className={`lg:hidden w-12 px-0 z-10 absolute transition-all top-10 -right-4 ${isOpen ? '' : '-right-12'}`}
      >
        {isOpen ? <PanelRightOpen /> : <PanelLeftOpen />}
      </Button>
      <div className="flex flex-col with-navbar justify-between">
        <div className="flex flex-col space-y-2 w-full">
          <div className="overflow-hidden border rounded-md">
            <div className="flex space-x-2 p-2 items-center">
              <AvatarProfile url={user?.image!} name={user?.name!} />
              <div className="flex flex-col justify-center gap-1">
                <h1 className="font-semibold text-xl">{user?.name}</h1>
                <p className="text-gray-700 text-sm">{user?.email}</p>
              </div>
            </div>
          </div>
          <h1 className="flex items-center justify-center font-medium">User Information</h1>
          <div className="flex items-center justify-center border rounded-md">
            <div className="w-full p-1">
              <div className="flex flex-col w-full h-full space-y-2 py-1 text-gray-800">
                <SidebarLink href={'/profile'} label={'Profile'}>
                  <User size={24} />
                </SidebarLink>
                <Separator />
                <SidebarLink href={'/carts'} label={'My Carts'}>
                  <ShoppingCart size={24} />
                </SidebarLink>
                <Separator />
                <SidebarLink href={'/orders'} label={'My Orders'}>
                  <Package size={24} />
                </SidebarLink>
                <Separator />
                <SidebarLink href={'/address'} label={'My Address'}>
                  <Truck size={24} />
                </SidebarLink>
                <Separator />
                <SidebarLink href={'/transactions'} label={'Transactions'}>
                  <Banknote size={24} />
                </SidebarLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
