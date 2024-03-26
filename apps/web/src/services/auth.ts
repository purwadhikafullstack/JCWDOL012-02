import { z } from 'zod';
import { AxiosError } from 'axios';
import { getActions } from '@/store/authStore';
import { axiosInstance, axiosAuth } from '@/lib/axios';
import { confirmRegisterSchema, loginSchema } from '@/validators/authValidator';
import { ErrorFromBe } from '@/@types';
import { requestResetPasswordSchema, resetPasswordSchema } from '@/validators/userValidator';

const { setAccessToken } = getActions();

export const registerVerify = async (values: z.infer<typeof confirmRegisterSchema>) => {
  return await axiosInstance
    .post('/auth/register/verify', values)
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data;
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error.response?.data.message);
    });
};

export const loginEmail = async (values: z.infer<typeof loginSchema>) => {
  return await axiosInstance
    .post('/auth/login', values)
    .then((res) => res.data)
    .then((data) => {
      if (data.success) setAccessToken(data.access_token);
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error.response?.data.message);
    });
};

export const logout = async () => {
  return await axiosAuth
    .post('/auth/logout')
    .then((res) => res.data)
    .then((data) => {
      if (data.success) {
        setAccessToken('');
        return data;
      }
    });
};

export const requestResetPassword = async (values: z.infer<typeof requestResetPasswordSchema>) => {
  return await axiosInstance
    .post('/auth/reset-password/request', values)
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
    .put('/auth/reset-password/confirm', values)
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data;
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error.response?.data.message);
    });
};

export const fetchUser = async () => {
  return await axiosAuth
    .get('/user/me')
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data.data;
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      return error.response?.data.message;
    });
};
