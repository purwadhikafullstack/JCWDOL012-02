import { z } from 'zod';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

export const requestResetPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
});

export const resetPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  code: z.string(),
  newPassword: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

export const userProfileSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }).optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
});

export const imageSchema = z.object({
  image: z
    .any()
    .refine((file: FileList) => file!.length < 1, {
      message: 'Please select an image.',
    })
    .refine((file: File) => file!.size <= 1e6, {
      message: 'Max image size 1MB',
    })
    .refine((file: File) => !ACCEPTED_IMAGE_TYPES.includes(file!.type), {
      message: 'Only .jpg, .jpeg, .png and .gif formats are supported.',
    }),
});

export const userUpdatePasswordSchema = z.object({
  oldPassword: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  newPassword: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});

export const addressSchema = z.object({
  label: z.string().min(3, { message: 'Label must be at least 3 characters.' }),
  recipientName: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  phoneNumber: z.string().min(3, { message: 'Phone must be at least 3 characters.' }),
  provinceId: z.string(),
  cityId: z.string(),
  fullAddress: z.string().min(3, { message: 'Address must be at least 3 characters.' }),
  latitude: z.number(),
  longitude: z.number(),
  isMainAddress: z.boolean().optional(),
});

export const updateAddressSchema = z.object({
  label: z.string().min(3, { message: 'Label must be at least 3 characters.' }),
  recipientName: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  phoneNumber: z.string().min(3, { message: 'Phone must be at least 3 characters.' }),
  provinceId: z.string(),
  cityId: z.string(),
  fullAddress: z.string().min(3, { message: 'Address must be at least 3 characters.' }),
  latitude: z.number(),
  longitude: z.number(),
  isMainAddress: z.boolean().optional(),
});
