import { z } from 'zod';

export const resetPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  code: z.string(),
  newPassword: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});
