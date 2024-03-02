import crypto from 'crypto';

export const generateOtp = (length: number) => {
  let otp = '';
  for (let i = 0; i < 6; i++) {
    const random = crypto.randomInt(0, 9);
    otp += random.toString();
  }
  return otp;
};
