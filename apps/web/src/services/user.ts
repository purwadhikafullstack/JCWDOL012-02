import { resetPasswordSchema } from '@/validators/userValidator';
import { z } from 'zod';

const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const resetPassword = async (values: z.infer<typeof resetPasswordSchema>) => {
  const res = await fetch(`${apiUrl}/user/reset-password/confirm`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  if (data.success) {
    return data;
  } else {
    throw new Error(data.message);
  }
};
