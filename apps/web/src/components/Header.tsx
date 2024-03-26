'use client';

import Link from 'next/link';
import UserMenu from './menubar/UserMenu';
import MaxWidthWrapper from './MaxWidthWrapper';
import { adminPage, authPage, profilePage } from '@/lib/constants';
import { fetchUser } from '@/services/auth';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { buttonVariants } from './ui/button';
import { useSessionStore } from '@/utils/SessionProvider';
import SearchInput from './menubar/SearchInput';

interface HeaderProps {
  refreshToken?: string | undefined;
}

export const Header = (props: HeaderProps) => {
  const { refreshToken } = props;
  const { user, isAuthenticated, setUser, resetUser } = useSessionStore((state) => state);
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
          {adminPage.includes(pathname) || profilePage.includes(pathname) ? null : <SearchInput />}
          {isAuthenticated ? (
            <UserMenu />
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
