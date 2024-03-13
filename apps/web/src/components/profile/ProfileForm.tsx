'use client';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { userProfileSchema } from '@/validators/userValidator';
import { Button } from '../ui/button';
import { User } from '@/@types/user';
import { updateProfile } from '@/services/user';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Textarea } from '../ui/textarea';
import { useSessionStore } from '@/utils/SessionProvider';

interface ProfileFormProps {
  user: User;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const { getUser } = useSessionStore((state) => state);
  const router = useRouter();

  const form = useForm<z.infer<typeof userProfileSchema>>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: user.name || '',
      phone: user.phone || '',
      bio: user.bio || '',
    },
  });

  function onSubmit(values: z.infer<typeof userProfileSchema>) {
    toast.promise(updateProfile(values), {
      loading: 'Updating profile...',
      success: (data) => {
        getUser();
        return data.message;
      },
      error: (error) => {
        if (error.message === 'Unauthorized access') {
          router.push('/');
          return 'Session expired, please login again';
        }
      },
    });
  }

  return (
    <div className="col-span-2">
      <p className="text-md font-semibold mb-2 text-gray-700">Change your profile</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="name" placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="string" placeholder="Phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea rows={3} placeholder="Bio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save Changes</Button>
        </form>
      </Form>
    </div>
  );
}
