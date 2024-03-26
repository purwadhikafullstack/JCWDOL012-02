import { z } from 'zod';
import { AxiosError } from 'axios';
import { ErrorFromBe } from '@/@types';
import { axiosInstance, axiosAuth } from '@/lib/axios';
import {
  requestResetPasswordSchema,
  resetPasswordSchema,
  userChangeEmailSchema,
  userProfileSchema,
  userUpdatePasswordSchema,
} from '@/validators/userValidator';

export const uploadImage = async (formData: FormData) => {
  return await axiosAuth
    .put('/user/update/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data;
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error.response?.data.message);
    });
};

export const updateProfile = async (values: z.infer<typeof userProfileSchema>) => {
  return await axiosAuth
    .put('/user/update/profile', values)
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data;
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error.response?.data.message);
    });
};

export const updatePassword = async (values: z.infer<typeof userUpdatePasswordSchema>) => {
  return await axiosAuth
    .put('/user/update/password', values)
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data;
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error.response?.data.message);
    });
};

export const getUserEmail = async () => {
  return await axiosAuth
    .get(`/user/email`)
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data.data;
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error.response?.data.message);
    });
};

export const requestUpdateEmail = async (values: z.infer<typeof userChangeEmailSchema>) => {
  return await axiosAuth
    .post('/user/update/email/request', values)
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data;
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error.response?.data.message);
    });
};

export const verifyUpdateEmail = async (code: string, email: string) => {
  const values = { code, email };
  return await axiosAuth
    .put('/user/update/email/verify', values)
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data;
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error.response?.data.message);
    });
};
