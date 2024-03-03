import prisma from '@/prisma';

export const getUserWithEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      LocalAuth: true,
      SocialAuth: true,
    },
  });
};

export const setUserOtp = async (email: string, otp: string) => {
  return await prisma.user.update({
    where: {
      email,
    },
    data: {
      LocalAuth: {
        update: {
          otpCode: otp,
        },
      },
    },
  });
};

export const resetPasswordUser = async (email: string, newPassword: string) => {
  return await prisma.user.update({
    where: {
      email,
    },
    data: {
      LocalAuth: {
        update: {
          password: newPassword,
          otpCode: null,
        },
      },
    },
  });
};
