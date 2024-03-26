import { z } from 'zod';

export const categoryEnum = z.enum(['Laptop', 'Phone']);
export const brandEnum = z.enum(['Axioo', 'Apple', 'Samsung', 'Xiaomi', 'Asus', 'Lenovo', 'Oppo']);

export const createProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters.' })
    .max(100, { message: 'Name must be less than 100 characters.' }),
  description: z
    .string()
    .min(3, { message: 'Description must be at least 3 characters.' })
    .max(2000, { message: 'Description must be less than 1000 characters.' }),
  price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: 'Expected number, received a string',
  }),
  category: categoryEnum,
  brand: brandEnum,
  image: z.any().refine(
    (files) => {
      return Array.from(files).every((file) => file instanceof File);
    },
    { message: 'Expected a file' },
  ),
});
