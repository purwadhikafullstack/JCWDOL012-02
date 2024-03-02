'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { confirmRegisterSchema } from '@/validators/authValidator';
import { useRouter, useSearchParams } from 'next/navigation';
import { registerVerify } from '@/app/actions/auth';
import { toast } from 'sonner';

interface ConfirmRegisterFormProps {
  code: string;
}

export default function ConfirmRegisterForm(props: ConfirmRegisterFormProps) {
  const { code } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const form = useForm<z.infer<typeof confirmRegisterSchema>>({
    resolver: zodResolver(confirmRegisterSchema),
    defaultValues: {
      name: '',
      password: '',
      email: email || '',
      code,
    },
  });

  function onSubmit(values: z.infer<typeof confirmRegisterSchema>) {
    toast.promise(registerVerify(values), {
      loading: 'Verifying and registering...',
      success: (data) => {
        router.push('/auth/login');
        return data.message;
      },
      error: (error) => {
        return error.message;
      },
    });
  }

  return (
    <div className="flex flex-col w-full max-w-[500px] justify-center md:px-14 px-4 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Register to your account.</h1>
        <p className="text-sm text-gray-600 font-medium">
          Wellcome to Megatronics, enter your name and password to complete registration.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
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
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}
