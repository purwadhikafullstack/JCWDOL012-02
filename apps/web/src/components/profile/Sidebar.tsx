'use client';

import React, { useState } from 'react';
import { useSessionStore } from '@/utils/SessionProvider';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import AvatarProfile from '../AvatarProfile';
import Link from 'next/link';
import {
  Banknote,
  CalendarRange,
  LayoutDashboard,
  Package,
  PanelLeftOpen,
  PanelRightOpen,
  ShoppingCart,
  Truck,
  User,
} from 'lucide-react';
import SidebarLink from './SidebarLink';

export default function Sidebar() {
  const { user } = useSessionStore((state) => state);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSidebar = () => {
    setIsOpen(!isOpen);
  };

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
              <AvatarProfile url={user.image} name={user.name} />
              <div className="flex flex-col justify-center gap-1">
                <h1 className="font-semibold text-xl">{user.name}</h1>
                <p className="text-gray-700 text-sm">{user.email}</p>
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
                <SidebarLink href={'/cart'} label={'My Carts'}>
                  <ShoppingCart size={24} />
                </SidebarLink>
                <Separator />
                <SidebarLink href={'/order'} label={'My Orders'}>
                  <Package size={24} />
                </SidebarLink>
                <Separator />
                <SidebarLink href={'/shiping-address'} label={'Shipping Addresses'}>
                  <Truck size={24} />
                </SidebarLink>
                <Separator />
                <SidebarLink href={'/transactions'} label={'Transactions'}>
                  <Banknote size={24} />
                </SidebarLink>
              </div>
            </div>
          </div>
          {user.role === 'SuperAdmin' && (
            <>
              <h1 className="flex items-center justify-center font-semibold">Event Organizer</h1>
              <div className="flex items-center justify-center border rounded-md">
                <div className="w-full p-1">
                  <div className="flex-col w-full h-full gap-2">
                    <Link className="flex w-full justify-between" href="/dashboard" onClick={handleOpenSidebar}>
                      <p>Dashboard</p>
                      <LayoutDashboard size={18} />
                    </Link>
                    <Separator />
                    <Link className="flex w-full justify-between" href="/products" onClick={handleOpenSidebar}>
                      <p>My Events</p>
                      <CalendarRange size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
