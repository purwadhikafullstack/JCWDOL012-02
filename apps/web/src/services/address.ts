import { ErrorFromBe } from '@/@types';
import { IAddress } from '@/@types/user';
import { axiosAuth, axiosInstance } from '@/lib/axios';
import { addressSchema, updateAddressSchema } from '@/validators/userValidator';
import axios, { AxiosError } from 'axios';
import { OpenCageProvider } from 'leaflet-geosearch';
import { revalidatePath } from 'next/cache';
import { geocode } from 'opencage-api-client';
import { z } from 'zod';

export const openCageProvider = new OpenCageProvider({
  params: { key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY! },
});

export const locationDetails = async (lat: number, lng: number) => {
  return geocode({
    key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY!,
    q: `${lat}+${lng}`,
    no_annotations: 1,
  }).then((res) => res.results[0]);
};

export const postNewAddress = async (values: z.infer<typeof addressSchema>) => {
  return await axiosAuth
    .post('/user/address', values)
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data;
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error.response?.data.message);
    });
};

export const getAddress = async (): Promise<IAddress[]> => {
  return await axiosAuth
    .get('/user/address')
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data.addresses;
      revalidatePath('/address');
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error.response?.data.message);
    });
};

export const updateAddress = async (addressId: number, values: z.infer<typeof addressSchema>) => {
  return await axiosAuth
    .put(`/user/address/${addressId}`, values)
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data;
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error.response?.data.message);
    });
};

export const deleteAddress = async (addressId: number) => {
  return await axiosAuth
    .delete(`/user/address/${addressId}`)
    .then((res) => res.data)
    .then((data) => {
      if (data.success) return data;
    })
    .catch((error: AxiosError<ErrorFromBe>) => {
      throw new Error(error.response?.data.message);
    });
};
