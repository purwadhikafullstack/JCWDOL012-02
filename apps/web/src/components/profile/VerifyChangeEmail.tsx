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
} from '@/components/ui/alert-dialog';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyUpdateEmail } from '@/services/user';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

export default function VerifyChangeEmail() {
  const [open, setOpen] = useState(false);
  const query = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');
  const email = searchParams.get('email');

  useEffect(() => {
    if (code) setOpen(true);
  }, [code]);

  function onSubmit() {
    toast.promise(verifyUpdateEmail(code!, email!), {
      loading: 'Verifying...',
      success: (data) => {
        setOpen(false);
        router.push('/login');
        query.invalidateQueries({ queryKey: ['user-email'] });
        return data.message;
      },
      error: (error) => error.message,
    });
  }

  return (
    <AlertDialog open={open} defaultOpen={false}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
