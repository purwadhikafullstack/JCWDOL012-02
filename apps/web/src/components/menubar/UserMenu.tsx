import React from 'react';
import AvatarProfile from '../AvatarProfile';
import Link from 'next/link';
import { logout } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/utils/SessionProvider';
import { Banknote, LogOut, Package, ShoppingCart, Truck, User } from 'lucide-react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';

export default function UserMenu() {
  const { user, resetUser } = useSessionStore((state) => state);

  const router = useRouter();
  const handleLogout = () => {
    router.push('/');
    logout();
    resetUser();
  };

  return (
    <Menubar className="border-none">
      <MenubarMenu>
        <MenubarTrigger className="data-[state=open]:bg-background data-[state=closed]:bg-background">
          <AvatarProfile url={user.image} name={user.name} />
        </MenubarTrigger>
        <MenubarContent align="end" className="font-medium text-gray-800 min-w-[250px]">
          <MenubarItem className="focus:bg-background max-w-[300px]">
            <div className="flex w-full justify-between items-center space-x-4">
              <AvatarProfile url={user.image} name={user.name} />
              <p>{user.name}</p>
            </div>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Link href={'/profile'} className="flex w-full justify-between">
              <p>Profile</p>
              <User />
            </Link>
          </MenubarItem>
          <MenubarItem>
            <Link href={'/carts'} className="flex w-full justify-between">
              <p>My Carts</p>
              <ShoppingCart />
            </Link>
          </MenubarItem>
          <MenubarItem>
            <Link href={'/orders'} className="flex w-full justify-between">
              <p>My Orders</p>
              <Package />
            </Link>
          </MenubarItem>
          <MenubarItem>
            <Link href={'/address'} className="flex w-full justify-between">
              <p>My Address</p>
              <Truck />
            </Link>
          </MenubarItem>
          <MenubarItem>
            <Link href={'/transactions'} className="flex w-full justify-between">
              <p>Transactions</p>
              <Banknote />
            </Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={handleLogout} className="flex w-full justify-between cursor-pointer">
            <p>Logout</p>
            <LogOut />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
