'use client';

import React, { useState } from 'react';
import { useSessionStore } from '@/utils/SessionProvider';
import { Separator } from '../ui/separator';
import { usePathname, useRouter } from 'next/navigation';
import SidebarLink from '../profile/SidebarLink';
import { adminLinks } from '@/lib/constants';
import Icon from '../icon';
import { icons, PackagePlus } from 'lucide-react';
import Link from 'next/link';

export default function AdminSidebar() {
  const { user } = useSessionStore((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleOpenSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (!user) {
    router.push('/');
  }

  return (
    <div
      className={`lg:flex lg:relative absolute bg-background shadow-lg shadow-gray-200/80 lg:-translate-x-0 ease-in transition-all flex-col w-[300px] max-w-[320px] min-h-full p-2 gap-2 border rounded-md backdrop-blur-2xl justify-between z-20 ${
        isOpen ? '-translate-x-0' : '-translate-x-[400px]'
      } `}
    >
      <div className="flex flex-col with-navbar h-full justify-between">
        <div className="flex items-center justify-center border rounded-md">
          <div className="w-full p-1">
            {adminLinks.map((link, index) => {
              const icon = link.icon as keyof typeof icons;
              return (
                <div key={index} className="flex flex-col space-y-1 py-1 text-gray-800">
                  <SidebarLink href={link.href} label={link.name} active={pathname === link.href}>
                    <Icon name={icon} />
                  </SidebarLink>
                  {index !== adminLinks.length - 1 ? <Separator /> : null}
                </div>
              );
            })}
          </div>
        </div>
        {/* <Link
          href="/admin/products/create"
          className="flex w-full font-medium justify-between items-center p-4 border rounded-md"
        >
          <p>Add New Product</p>
          <PackagePlus />
        </Link> */}
      </div>
    </div>
  );
}
