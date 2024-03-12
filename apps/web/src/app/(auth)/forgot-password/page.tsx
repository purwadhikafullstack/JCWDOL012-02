import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Card } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function ResetPassword() {
  return (
    <MaxWidthWrapper className="max-w-screen-2xl flex min-h-screen w-full items-center justify-center">
      <Card className="flex w-[1200px] h-[600px] overflow-hidden">
        <div className="flex flex-col flex-1 w-full justify-center items-center">
          <div className="flex w-full max-w-[500px] justify-between md:px-14 px-4 mb-8">
            <div>Megatronics.</div>
            <Link href="/" className="text-sm flex items-center text-gray-700 space-x-4">
              <ChevronLeft size={16} /> Back to home
            </Link>
          </div>
        </div>
        <div className="lg:flex hidden flex-1 w-full">
          <Image
            src="/auth-image.png"
            alt="logo"
            width={800}
            height={800}
            className="object-cover object-center"
            priority
          />
        </div>
      </Card>
    </MaxWidthWrapper>
  );
}
