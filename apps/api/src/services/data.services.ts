import prisma from '@/prisma';

export const getCities = async () => {
  return await prisma.city.findMany();
};
export const getProvinces = async () => {
  return await prisma.province.findMany();
};
