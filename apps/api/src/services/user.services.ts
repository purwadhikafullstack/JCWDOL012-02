import prisma from '@/prisma';

export const getUserAuth = async (id: number) => {
  return await prisma.user.findUnique({ where: { id }, include: { LocalAuth: true, SocialAuth: true } });
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({ where: { id } });
};

export const getUserWithEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
    include: { LocalAuth: true, SocialAuth: true },
  });
};

export const getUserWithId = async (id: number) => {
  return await prisma.user.findUnique({ where: { id }, include: { LocalAuth: true, SocialAuth: true } });
};

export const getPasswordUser = async (id: number) => {
  return await prisma.localAuth.findUnique({ where: { userId: id }, select: { password: true } });
};

export const setUserOtp = async (email: string, otp: string) => {
  return await prisma.user.update({
    where: { email },
    data: { LocalAuth: { update: { otpCode: otp } } },
  });
};

export const updateImageUser = async (id: number, image: string) => {
  return await prisma.user.update({
    where: { id },
    data: { image },
  });
};

export const updateProfileUser = async (id: number, name: string, phone: string, bio: string) => {
  return await prisma.user.update({
    where: { id: id },
    data: { name: name, phone: phone, bio: bio },
  });
};

export const updatePasswordUser = async (id: number, newPassword: string) => {
  return await prisma.user.update({
    where: { id: id },
    data: { LocalAuth: { update: { password: newPassword } } },
  });
};

export const resetPasswordUser = async (email: string, newPassword: string) => {
  return await prisma.user.update({
    where: { email },
    data: { LocalAuth: { update: { password: newPassword, otpCode: null } } },
  });
};

export const getUserEmail = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      email: true,
      LocalAuth: { select: { email: true, confirmed: true } },
      SocialAuth: { select: { email: true } },
    },
  });
};

export const getExistingEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const setUpdateEmail = async (userId: number, email: string, expiresAt: Date, code: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      LocalAuth: {
        update: { email: email, confirmationCode: code, confirmationTimeStamp: expiresAt, confirmed: false },
      },
    },
  });
};

export const updateEmailUser = async (userId: number, email: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { email, LocalAuth: { update: { email, confirmed: true } } },
  });
};
