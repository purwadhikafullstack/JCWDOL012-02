'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '../../ui/button';
import { addNewAdminSchema } from '@/validators/adminValidator';
import { Input } from '../../ui/input';
import { Separator } from '../../ui/separator';
import { toast } from 'sonner';
import { Pencil } from 'lucide-react';
import { User } from '@/@types/user';
import { updateWarehouseAdmin } from '@/services/admin';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  data: User;
}

export default function UpdateAdminWarehouse({ data }: Props) {
  const query = useQueryClient();
  const form = useForm<z.infer<typeof addNewAdminSchema>>({
    resolver: zodResolver(addNewAdminSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof addNewAdminSchema>) {
    toast.promise(updateWarehouseAdmin(data.id, values), {
      loading: 'Updating Admin...',
      success: (data) => {
        query.invalidateQueries({ queryKey: ['users'] });
        return data.message;
      },
      error: (err) => err.message,
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" className="h-6 w-6">
          <Pencil size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Admin Account</DialogTitle>
          <DialogDescription>Make changes to admin account here.</DialogDescription>
          <Separator />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-Mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="example@mail.com" {...field} />
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
                Update
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
