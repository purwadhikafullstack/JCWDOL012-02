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
import GoogleButton from './GoogleButton';

export default function LoginForm() {
  const { getUser } = useSessionStore((state) => state);
  const { setAccessToken } = getActions();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callback = searchParams.get('callback');
  const accessToken = searchParams.get('accessToken');

  const backToBefore = () => {
    router.push(callback || '/');
  };

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken);
      router.push(callback || '/');
    }
  }, [accessToken, setAccessToken, router, callback]);

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
        getUser();
        backToBefore();
        return 'Login success';
      },
      error: (error) => error.message,
    });
    form.reset();
  }

  return (
    <div className="flex flex-col w-full max-w-[500px] justify-center md:px-14 px-4 space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-3xl font-bold">Login to your account.</h1>
        <p className="text-sm text-gray-600 font-medium">Wellcome to Megatronics, enter your credentials.</p>
      </div>
      <div className="flex wfull justify-center items-center space-x-2">
        <GoogleButton />
      </div>
      <div className="flex w-full justify-center items-center space-x-2 text-sm text-gray-600">
        <Separator className="md:max-w-24 max-w-12" />
        <p>or continue with email</p>
        <Separator className="md:max-w-24 max-w-12" />
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
          <div className="flex w-full justify-end">
            <Link href="/request/reset-password" className="underline text-sm font-medium text-blue-600">
              Forgot password ?
            </Link>
          </div>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
      </Form>
      <div className="flex space-x-2 text-sm text-gray-600 font-medium justify-center">
        <p>Don&apos;t have an account?</p>
        <Link href="/register" className="underline text-blue-600">
          Create an account
        </Link>
      </div>
    </div>
  );
}
