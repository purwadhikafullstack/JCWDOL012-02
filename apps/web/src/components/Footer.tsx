'use client';

import Link from 'next/link';
import Image from 'next/image';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { authPage } from '@/lib/constants';
import { usePathname } from 'next/navigation';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

export const Footer = () => {
  const pathname = usePathname();

  if (authPage.includes(pathname)) {
    return null;
  }
  return (
    <footer>
      <MaxWidthWrapper className="max-w-screen-2xl">
        <div className="grid lg:grid-cols-3 gap-12 items-start mx-auto text-center">
          <div>
            <Link className="inline-block" href="#">
              <h3 className="font-semibold tracking-wide">Megatronics.</h3>
              <span className="sr-only">Acme</span>
            </Link>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              The best products at the best prices. Shop the Acme catalog.
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold tracking-wide">Categories</h3>
              <nav className="flex flex-col gap-2">
                <Link
                  className="text-sm text-gray-500 dark:text-gray-400 transition underline hover:opacity-70"
                  href="#"
                >
                  Phone
                </Link>
                <Link
                  className="text-sm text-gray-500 dark:text-gray-400 transition underline hover:opacity-70"
                  href="#"
                >
                  Laptop
                </Link>
                <Link
                  className="text-sm text-gray-500 dark:text-gray-400 transition underline hover:opacity-70"
                  href="#"
                >
                  Electronics
                </Link>
              </nav>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold tracking-wide">Follow Us</h3>
              <div className="flex justify-center gap-4">
                <Link className="rounded-full p-2 bg-gray-200 dark:bg-gray-800 hover:opacity-70 transition" href="#">
                  <FiFacebook />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link className="rounded-full p-2 bg-gray-200 dark:bg-gray-800 hover:opacity-70 transition" href="#">
                  <FiInstagram />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link className="rounded-full p-2 bg-gray-200 dark:bg-gray-800 hover:opacity-70 transition" href="#">
                  <FiTwitter />
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold tracking-wide">Newsletter</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sign up for updates, offers and more</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input placeholder="Enter your email" required type="email" />
                <Button type="submit">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray-200 dark:border-gray-800 w-full max-w-sm mx-auto my-4" />
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          © 2024 Megatronics – All rights reserved
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};
