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
  phone: z
    .string()
    .min(10, {
      message: 'Phone number must be at least 10 characters.',
    })
    .optional(),
  bio: z.string().min(3, { message: 'Bio must be at least 3 characters.' }).optional(),
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
