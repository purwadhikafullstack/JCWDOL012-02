'use client';

import { resetPassword } from '@/services/user';
import { resetPasswordSchema } from '@/validators/userValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';

export default function RequestResetPassword() {
  const router = useRouter();
  const searchParam = useSearchParams();

  const email = searchParam.get('email');
  const code = searchParam.get('code');

  console.log(email, code);

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
        router.push('/profile');
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
            <Link href="/profile" className="text-sm flex items-center text-gray-700 space-x-4">
              <ChevronLeft size={16} /> Back to profile
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
