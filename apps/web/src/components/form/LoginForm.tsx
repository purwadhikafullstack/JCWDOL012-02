'use client';

import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '../ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { loginSchema } from '@/validators/authValidator';
import { FaGoogle } from 'react-icons/fa6';
import { loginEmail } from '@/services/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSessionStore } from '@/utils/SessionProvider';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const { login, setLocalStorage, socialAuth } = useSessionStore((state) => state);
  const callback = searchParams.get('callback');
  const router = useRouter();

  const backToBefore = () => {
    router.push(callback || '/');
  };

  const googleAuth = () => {
    socialAuth(true);
    window.open(`${process.env.NEXT_PUBLIC_BASE_API_URL}auth/social/google`, '_self');
  };

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
      success: (data) => {
        backToBefore();
        setLocalStorage(data.user);
        login(data.user);
        return data.message;
      },
      error: (error) => {
        return error.message;
      },
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
        <Button variant="outline" className="py-0 gap-2 w-full font-medium text-gray-800" onClick={googleAuth}>
          <FaGoogle size={20} />
          Google
        </Button>
      </div>
      <div className="flex w-full justify-center items-center space-x-2 text-sm text-gray-600">
        <Separator className="w-24" />
        <p>or continue with email</p>
        <Separator className="w-24" />
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
            <Link href="/auth/forgot-password" className="underline text-sm font-medium text-blue-600">
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
