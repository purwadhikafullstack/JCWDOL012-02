import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

export const registerEmailSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
});

export const confirmRegisterSchema = loginSchema.extend({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  code: z.string(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
});
