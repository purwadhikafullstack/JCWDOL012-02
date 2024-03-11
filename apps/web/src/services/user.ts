import { z } from 'zod';
import { AxiosError } from 'axios';
import { ErrorFromBe } from '@/@types';
import { axiosInstance, axiosAuth } from '@/lib/axios';
import {
  requestResetPasswordSchema,
  resetPasswordSchema,
  userProfileSchema,
  userUpdatePasswordSchema,
} from '@/validators/userValidator';

export const requestResetPassword = async (values: z.infer<typeof requestResetPasswordSchema>) => {
  return await axiosInstance
    .post('/user/reset-password/request', values)
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data;
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error.response?.data.message);
    });
};

export const resetPassword = async (values: z.infer<typeof resetPasswordSchema>) => {
  return await axiosInstance
    .put('/user/reset-password/confirm', values)
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data;
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error.response?.data.message);
    });
};

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
