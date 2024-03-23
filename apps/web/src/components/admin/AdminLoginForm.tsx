'use client';

import Link from 'next/link';
import { z } from 'zod';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Separator } from '../ui/separator';
import { loginEmail } from '@/services/auth';
import { getActions } from '@/store/authStore';
import { loginSchema } from '@/validators/authValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSessionStore } from '@/utils/SessionProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export default function AdminLoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  function onSubmit(values: z.infer<typeof loginSchema>) {
    toast.promise(loginEmail(values), {
      loading: 'Logging in...',
      success: () => {
        router.push('/admin');
        return 'Login success';
      },
      error: (error) => error.message,
    });
  }

  return (
    <div className="flex flex-col w-full max-w-[500px] justify-center md:px-14 px-4 space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-3xl font-bold">Login to admin account.</h1>
        <p className="text-sm text-gray-600 font-medium">Wellcome to Megatronics, enter your credentials.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail</FormLabel>
                <FormControl>
                  <Input placeholder="example@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
