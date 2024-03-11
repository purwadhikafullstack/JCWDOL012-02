'use server';

import { z } from 'zod';
import { AxiosError } from 'axios';
import { ErrorFromBe } from '@/@types';
import { axiosInstance } from '@/lib/axios';
import { confirmRegisterSchema, registerEmailSchema } from '@/validators/authValidator';

export const registerEmail = async (values: z.infer<typeof registerEmailSchema>) => {
  return await axiosInstance
    .post('auth/register/email', values)
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data;
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error?.response?.data.message);
    });
};

export const registerVerify = async (values: z.infer<typeof confirmRegisterSchema>) => {
  return await axiosInstance
    .post('auth/register/verify', values)
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data;
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error?.response?.data.message);
    });
};
