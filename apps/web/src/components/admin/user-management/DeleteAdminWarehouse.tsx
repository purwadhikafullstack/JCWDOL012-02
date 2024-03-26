'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteWarehouseAdmin } from '@/services/admin';
import { useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  email: string;
}

export default function DeleteAdminWarehouse({ email }: Props) {
  const query = useQueryClient();
  function handleDeleteAdmin() {
    toast.promise(deleteWarehouseAdmin(email), {
      loading: 'Deleting admin account...',
      success: (data) => {
        query.invalidateQueries({ queryKey: ['users'] });
        return data.message;
      },
      error: (error) => error.message,
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon" className="h-6 w-6">
          <Trash size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete admin account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteAdmin}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
