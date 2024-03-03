import { z } from 'zod';
import { loginSchema } from '@/validators/authValidator';
import { initialUser } from '@/store/sessionStore';

const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const loginEmail = async (values: z.infer<typeof loginSchema>) => {
  const res = await fetch(`${apiUrl}auth/local/login`, {
    method: 'POST',
    credentials: 'include',
    redirect: 'follow',
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

export const refetchUser = async () => {
  const res = await fetch(`${apiUrl}user/profile`, {
    method: 'GET',
    credentials: 'include',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  const user = data.user;
  if (user) {
    return user;
  } else return initialUser;
};

export const logout = async () => {
  return await fetch(`${apiUrl}auth/local/logout`, {
    method: 'POST',
    credentials: 'include',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
