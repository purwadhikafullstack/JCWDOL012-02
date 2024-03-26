import { ErrorFromBe } from '@/@types';
import { axiosAuth } from '@/lib/axios';
import { addNewAdminSchema } from '@/validators/adminValidator';
import { AxiosError } from 'axios';
import { z } from 'zod';

export const getUsers = async () => {
  return await axiosAuth
    .get('/admin/user-management/users')
    .then((res) => res.data)
    .then((data) => {
      if (data.success) {
        const warehouseAdmin = data.data.warehouseAdmin;
        const users = data.data.users;
        return { warehouseAdmin, users };
      }
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error.response?.data.message);
    });
};

export const createWarehouseAdmin = async (values: z.infer<typeof addNewAdminSchema>) => {
  return await axiosAuth
    .post('/admin/user-management/admin', values)
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data;
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error.response?.data.message);
    });
};

export const deleteWarehouseAdmin = async (email: string) => {
  return await axiosAuth
    .delete(`/admin/user-management/admin/${email}`)
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data;
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error.response?.data.message);
    });
};

export const updateWarehouseAdmin = async (id: number, values: z.infer<typeof addNewAdminSchema>) => {
  return await axiosAuth
    .put(`/admin/user-management/admin/${id}`, values)
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data;
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error.response?.data.message);
    });
};
