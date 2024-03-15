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
import { deleteAddress } from '@/services/address';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { buttonVariants } from '../ui/button';

export default function DeleteAddress({ addressId }: { addressId: number }) {
  const query = useQueryClient();
  const mutation = useMutation({
    mutationFn: (addressId: number) => deleteAddress(addressId),
  });

  function handleDeleteAddress(addressId: number) {
    mutation.mutate(addressId, {
      onSuccess: () => {
        toast.success('Address deleted successfully');
        query.invalidateQueries({ queryKey: ['address'] });
      },
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className={buttonVariants({ variant: 'default', size: 'icon', className: 'w-8 h-8' })}>
        <Trash2 size={16} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete this address?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteAddress(addressId)}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
