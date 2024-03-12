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
import { updateUser } from '@/hooks/updateUser';
import { useSessionStore } from '@/utils/SessionProvider';
import { useRouter } from 'next/navigation';

interface ProfileFormProps {
  user: User;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const { setLocalStorage, reset } = useSessionStore((state) => state);
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
        updateUser(setLocalStorage);
        return data.message;
      },
      error: (error) => {
        if (error.message === 'Unauthorized access') {
          reset();
          router.push('/');
          return 'Session expired, please login again';
        }
        return error.message;
      },
    });
  }

  if (!user) {
    return null;
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
                  <Input type="name" placeholder={user.name} {...field} />
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
                  {user.phone ? (
                    <Input type="string" defaultValue={user.phone} placeholder={user.phone} {...field} />
                  ) : (
                    <Input type="string" placeholder="Phone number" {...field} />
                  )}
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
                  {user.bio ? (
                    <Input type="string" defaultValue={user.bio} placeholder={user.bio} {...field} />
                  ) : (
                    <Input type="string" placeholder="Bio" {...field} />
                  )}
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
