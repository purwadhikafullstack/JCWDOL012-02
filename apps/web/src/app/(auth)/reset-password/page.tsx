'use client';

import Link from 'next/link';
import Image from 'next/image';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { z } from 'zod';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from 'lucide-react';
import { resetPassword } from '@/services/user';
import { resetPasswordSchema } from '@/validators/userValidator';
import { useRouter, useSearchParams } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export default function RequestResetPassword() {
  const router = useRouter();
  const searchParam = useSearchParams();

  const code = searchParam.get('code');
  const email = searchParam.get('email');

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      code: code!,
      email: email!,
      newPassword: '',
    },
  });

  const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    toast.promise(resetPassword(values), {
      loading: 'Sending request to email...',
      success: (data) => {
        router.push('/login');
        return data.message;
      },
      error: (error) => {
        return error.message;
      },
    });
  };

  return (
    <MaxWidthWrapper className="flex items-center justify-center heightMaxBody">
      <Card className="flex w-[1200px] h-[600px] overflow-hidden">
        <div className="flex relative flex-col flex-1 w-full justify-center items-center">
          <div className="flex w-full absolute top-8 max-w-[500px] justify-between md:px-14 px-4 mb-8">
            <p>Megatronics.</p>
            <Link href="/" className="text-sm flex items-center text-gray-700 space-x-4">
              <ChevronLeft size={16} /> Back to home
            </Link>
          </div>
          <div className="flex flex-col w-full max-w-[500px] justify-center md:px-14 px-4 space-y-10">
            <div className="flex flex-col space-y-1">
              <h1 className="text-3xl font-bold">Reset Password</h1>
              <p className="text-sm text-gray-600 font-medium">Enter your new password here</p>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Confirm</Button>
              </form>
            </Form>
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
