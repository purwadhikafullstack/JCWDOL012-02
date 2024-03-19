import { axiosInstance } from '@/lib/axios';

export const getAllCity = async (): Promise<ICity[]> => {
  return await axiosInstance
    .get('/data/cities')
    .then((res) => res.data)
    .then((data) => {
      return data.cities;
    });
};

export const getAllProvince = async (): Promise<IProvince[]> => {
  return await axiosInstance
    .get('/data/provinces')
    .then((res) => res.data)
    .then((data) => {
      return data.provinces;
    });
};
