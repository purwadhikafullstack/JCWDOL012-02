'use client';

import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { registerEmailSchema } from '@/validators/authValidator';
import { Separator } from '../ui/separator';
import { FaGoogle } from 'react-icons/fa6';
import { registerEmail } from '@/app/actions/auth';
import { toast } from 'sonner';
import { useSessionStore } from '@/utils/SessionProvider';

export default function RegisterForm() {
  const { socialAuth } = useSessionStore((state) => state);

  const form = useForm<z.infer<typeof registerEmailSchema>>({
    resolver: zodResolver(registerEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const googleAuth = () => {
    socialAuth(true);
    window.open(`${process.env.NEXT_PUBLIC_BASE_API_URL}auth/social/google`, '_self');
  };

  function onSubmit(values: z.infer<typeof registerEmailSchema>) {
    toast.promise(registerEmail(values), {
      loading: 'Registering...',
      success: (data) => {
        return data.message;
      },
    });
  }

  return (
    <div className="flex flex-col w-full max-w-[500px] justify-center md:px-14 px-4 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Register to your account.</h1>
        <p className="text-sm text-gray-600 font-medium">Wellcome to Megatronics, enter your credentials.</p>
      </div>
      <div className="flex wfull justify-center items-center space-x-2">
        <Button onClick={googleAuth} variant="outline" className="py-0 gap-2 w-full font-medium text-gray-800">
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
          <Button className="w-full" type="submit">
            Register
          </Button>
        </form>
      </Form>
      <div className="flex space-x-2 text-sm text-gray-600 font-medium justify-center">
        <p>Have an account?</p>
        <Link href="/auth/login" className="underline text-blue-600">
          Login here
        </Link>
      </div>
    </div>
  );
}
