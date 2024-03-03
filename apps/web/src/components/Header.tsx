'use client';

import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { buttonVariants } from './ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { authPage } from '@/lib/constants';
import { logout, refetchUser } from '@/services/auth';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import AvatarProfile from './AvatarProfile';
import { LogOut, User } from 'lucide-react';
import { useSessionStore } from '@/utils/SessionProvider';
import { useEffect } from 'react';

export const Header = () => {
  const { user, isAuthenticated, reset, getLocalStorage, login, isSocialAuth, socialAuth, setLocalStorage } =
    useSessionStore((state) => state);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isSocial = isSocialAuth();
    getLocalStorage();
    const userData = async () => {
      await refetchUser().then((data) => {
        login(data);
        setLocalStorage(data);
      });
    };
    if (isSocial) {
      userData();
      socialAuth(false);
    }
  }, [getLocalStorage, login, isSocialAuth, socialAuth, setLocalStorage]);

  const logOut = () => {
    logout().then(() => {
      reset();
      router.push('/');
    });
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
          {isAuthenticated ? (
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
                  <MenubarSeparator />
                  <MenubarItem onClick={logOut} className="flex w-full justify-between cursor-pointer">
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
