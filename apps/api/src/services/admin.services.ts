import prisma from '@/prisma';

export interface CreateAdminPayload {
  email: string;
  name: string;
  password: string;
}

export type UpdateAdminPayload = CreateAdminPayload & { id: number };

export const createAdminData = async (data: CreateAdminPayload) => {
  const { email, name, password } = data;
  return await prisma.user.create({
    data: {
      email,
      name,
      authType: 'Local',
      role: 'WarehouseAdmin',
      LocalAuth: {
        create: { email, password, confirmed: true, confirmationCode: '', confirmationTimeStamp: new Date() },
      },
    },
  });
};

export const deleteAdminData = async (email: string) => {
  return await prisma.user.update({ where: { email }, data: { deleted: true } });
};

export const updateAdminData = async (data: UpdateAdminPayload) => {
  return await prisma.user.update({
    where: { id: data.id },
    data: {
      email: data.email,
      name: data.name,
      LocalAuth: { update: { password: data.password } },
    },
  });
};
