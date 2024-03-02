import { configs } from '@/config';
import { EmailType } from '@/services/sendEmail';
import crypto from 'crypto';

interface GenerateConfirmation {
  code: string;
  url: string;
}

export default function generateConfirmation(length: number, email: string, type: EmailType): GenerateConfirmation {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code: string = '';
  const randomBytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    const randomIndex = randomBytes.readUInt8(i) % characters.length;
    code += characters.charAt(randomIndex);
  }
  const verificationUrl = `${configs.frontEnd.url}/auth/confirm/${code}?email=${email}`;
  const resetPasswordUrl = `${configs.frontEnd.url}/auth/reset-password/${code}?email=${email}`;
  return {
    code,
    url: type === EmailType.verification ? verificationUrl : resetPasswordUrl,
  };
}
