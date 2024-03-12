import prisma from '@/prisma';

export const getUserWithEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
    include: { LocalAuth: true, SocialAuth: true },
  });
};

export const setRegisteringUser = async (email: string, expiresAt: Date, code: string) => {
  return await prisma.user.create({
    data: {
      email: email as string,
      authType: 'Local',
      LocalAuth: {
        create: { email: email as string, confirmationCode: code, confirmationTimeStamp: expiresAt },
      },
    },
  });
};

export const updateRegisteringUser = async (email: string, name: string, hashedPassword: string) => {
  await prisma.user.update({
    where: { email },
    data: { name, email, LocalAuth: { update: { password: hashedPassword, confirmed: true } } },
  });
};

export const setUserOtp = async (email: string, otp: string) => {
  return await prisma.user.update({
    where: { email },
    data: { LocalAuth: { update: { otpCode: otp } } },
  });
};

export const resetPasswordUser = async (email: string, newPassword: string) => {
  return await prisma.user.update({
    where: { email },
    data: { LocalAuth: { update: { password: newPassword, otpCode: null } } },
  });
};

export const updateImageUser = async (email: string, image: string) => {
  return await prisma.user.update({
    where: { email },
    data: { image },
  });
};

export const updateProfileUser = async (email: string, name: string, phone: string, bio: string) => {
  return await prisma.user.update({
    where: { email: email },
    data: { name: name, phone: phone, bio: bio },
  });
};
