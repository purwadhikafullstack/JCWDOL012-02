import { requestResetPasswordSchema, resetPasswordSchema, userProfileSchema } from '@/validators/userValidator';
import { z } from 'zod';

const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const requestResetPassword = async (values: z.infer<typeof requestResetPasswordSchema>) => {
  const res = await fetch(`${apiUrl}user/reset-password/request`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(values),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json();
  if (data.success) {
    return data;
  } else {
    throw new Error(data.message);
  }
};

export const resetPassword = async (values: z.infer<typeof resetPasswordSchema>) => {
  const res = await fetch(`${apiUrl}user/reset-password/confirm`, {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify(values),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json();
  if (data.success) {
    return data;
  } else {
    throw new Error(data.message);
  }
};

export const uploadImage = async (formData: FormData) => {
  const res = await fetch(`${apiUrl}user/update-image`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
  const data = await res.json();
  if (data.success) {
    return data;
  } else {
    throw new Error(data.message);
  }
};

export const updateProfile = async (values: z.infer<typeof userProfileSchema>) => {
  const res = await fetch(`${apiUrl}user/update-profile`, {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify(values),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json();
  if (data.success) {
    return data;
  } else {
    throw new Error(data.message);
  }
};
