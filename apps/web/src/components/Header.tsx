'use client';

import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { authPage } from '@/lib/constants';
import { useEffect } from 'react';
import { buttonVariants } from './ui/button';
import { useSessionStore } from '@/utils/SessionProvider';
import { fetchUser, logout } from '@/services/auth';
import { usePathname, useRouter } from 'next/navigation';
import { Banknote, LogOut, Package, ShoppingCart, Truck, User } from 'lucide-react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import AvatarProfile from './AvatarProfile';

interface HeaderProps {
  refreshToken?: string | undefined;
}

export const Header = (props: HeaderProps) => {
  const { refreshToken } = props;
  const { user, isAuthenticated, setUser, resetUser } = useSessionStore((state) => state);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getUserData = async () => {
      await fetchUser()
        .then((user) => setUser(user))
        .catch(() => resetUser());
    };
    if (refreshToken) {
      getUserData();
    }
  }, [setUser, resetUser, refreshToken]);

  const handleLogout = () => {
    router.push('/');
    logout();
    resetUser();
  };

  if (authPage.includes(pathname)) {
    return null;
  }

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/60 backdrop-blur-md transition-all">
      <MaxWidthWrapper className="max-w-screen-2xl">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex z-40 font-semibold text-lg">
            <span>Megatronics.</span>
          </Link>
          {isAuthenticated && user ? (
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
                      <p>Shipping Address</p>
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
          ) : (
            <div className="flex items-center space-x-4">
              <Link href={`/login?callback=${pathname}`} className={buttonVariants({ variant: 'outline' })}>
                Login
              </Link>
              <Link href="/register" className={buttonVariants({ variant: 'default' })}>
                Sign up
              </Link>
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
