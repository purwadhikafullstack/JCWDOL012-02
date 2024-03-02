'use client';

import { authPage } from '@/lib/constants';
import MaxWidthWrapper from './MaxWidthWrapper';
import { usePathname } from 'next/navigation';

export const Footer = () => {
  const pathname = usePathname();

  if (authPage.includes(pathname)) {
    return null;
  }
  return (
    <footer>
      <MaxWidthWrapper className="max-w-screen-2xl">
        <div>Footer</div>
      </MaxWidthWrapper>
    </footer>
  );
};
