import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import { Card } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <MaxWidthWrapper className="flex items-center justify-center min-h-screen">
      <Card className="flex w-[1200px] h-[600px] overflow-hidden">
        <div className="flex flex-col flex-1 relative w-full justify-center items-center ">
          <div className="flex w-full absolute top-4 max-w-[500px] justify-between md:px-14 px-4 mb-8">
            <div>Megatronics.</div>
            <Link href="/" className="text-sm flex items-center text-gray-700 space-x-4">
              <ChevronLeft size={16} /> Back to home
            </Link>
          </div>
          <AdminLoginForm />
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
