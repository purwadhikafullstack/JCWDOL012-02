'use server';

import { loginSchema, registerEmailSchema } from '@/validators/authValidator';
import { z } from 'zod';

const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const registerEmail = async (values: z.infer<typeof registerEmailSchema>) => {
  const res = await fetch(`${apiUrl}auth/local/register`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
};

export const registerVerify = async (values: z.infer<typeof registerEmailSchema>) => {
  const res = await fetch(`${apiUrl}auth/local/verify-register`, {
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
