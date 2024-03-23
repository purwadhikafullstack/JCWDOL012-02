'use client';

import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getUserEmail, requestUpdateEmail } from '@/services/user';
import { useSessionStore } from '@/utils/SessionProvider';
import { userChangeEmailSchema } from '@/validators/userValidator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { toast } from 'sonner';
import VerifyChangeEmail from './VerifyChangeEmail';

export default function ChangeEmail() {
  const { user } = useSessionStore((state) => state);
  const query = useQueryClient();
  const { data: email, isLoading } = useQuery({
    queryKey: ['user-email'],
    queryFn: () => getUserEmail(),
  });

  const form = useForm<z.infer<typeof userChangeEmailSchema>>({
    resolver: zodResolver(userChangeEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof userChangeEmailSchema>) {
    toast.promise(requestUpdateEmail(values), {
      loading: 'Sending request to email...',
      success: (data) => {
        query.invalidateQueries({ queryKey: ['user-email'] });
        return data.message;
      },
      error: (error) => error.message,
    });
  }

  console.log(email?.confirmed);

  if (isLoading) return <div>Loading</div>;

  return (
    <div className="flex flex-col gap-2 justify-center">
      <VerifyChangeEmail />
      <div className="flex items-center space-x-2">
        <span className="font-semibold">Email : </span>
        <p>{email.email}</p>
        {email.SocialAuth ? (
          <span className="bg-green-500 flex items-center text-sm text-gray-200 px-2 h-6 rounded-full">Verified</span>
        ) : (
          <div className="flex items-center gap-2">
            <span
              className={`${
                email?.LocalAuth.confirmed ? 'bg-green-500' : 'bg-red-500'
              } flex items-center text-sm text-gray-200 px-2 h-6 rounded-full`}
            >
              {email?.LocalAuth.confirmed ? 'Verified' : 'Not Verified'}
            </span>
            {/* {email?.confirmed ? null : <Button>Verify</Button>} */}
          </div>
        )}
      </div>
      {user.authType === 'Local' ? (
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Change Email</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Change Email</DialogTitle>
                <DialogDescription>Make changes to your email here.</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="New email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      ) : null}
    </div>
  );
}
