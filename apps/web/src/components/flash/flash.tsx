'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function FlashToaster() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const error = searchParams.get('error');
  const success = searchParams.get('success');
  const message = searchParams.get('message');

  useEffect(() => {
    if (error) {
      toast.error(error);
      router.replace('/');
    }
    if (success) {
      toast.success(success);
      router.replace('/');
    }
    if (message) {
      toast.success(message);
      router.replace('/');
    }
  }, [error, success, message, router]);

  return null;
}
