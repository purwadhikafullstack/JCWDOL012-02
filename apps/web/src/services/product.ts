import { ErrorFromBe } from '@/@types';
import { axiosAuth, axiosInstance } from '@/lib/axios';
import { createProductSchema } from '@/validators/productsValidator';
import { AxiosError } from 'axios';
import { z } from 'zod';

export enum Category {
  Laptops = 'Laptop',
  Phone = 'Phone',
}

export const postProduct = async (values: z.infer<typeof createProductSchema>, file: File | null) => {
  const formData = new FormData();
  formData.append('image', file!);
  formData.append('name', values.name);
  formData.append('description', values.description);
  formData.append('price', values.price);
  formData.append('category', values.category);
  formData.append('brand', values.brand);
  return await axiosAuth
    .post('/product', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => res.data)
    .then((data) => {
      return data;
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error.response?.data.message);
    });
};

export const getProducts = async () => {
  return await axiosInstance
    .get('/product')
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data.data;
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error.response?.data.message);
    });
};
