import prisma from '@/prisma';
import { Category, Brand } from '@prisma/client';

export interface ProductPayload {
  name: string;
  description: string;
  price: number;
  category: Category;
  brand: Brand;
  image: string;
}

export const postNewProduct = async (data: ProductPayload) => {
  return await prisma.product.create({ data });
};

export const getAllProducts = async () => {
  return await prisma.product.findMany();
};
