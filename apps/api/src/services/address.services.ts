import prisma from '@/prisma';

export interface NewAddressPayload {
  userId: number;
  latitude: number;
  longitude: number;
  label: string;
  recipientName: string;
  phoneNumber: string;
  provinceId: string;
  cityId: string;
  fullAddress: string;
  isMainAddress: boolean;
}

export interface UpdateAddressPayload {
  latitude: number;
  longitude: number;
  label: string;
  recipientName: string;
  phoneNumber: string;
  provinceId: string;
  cityId: string;
  fullAddress: string;
  isMainAddress: boolean;
}

export const addAddress = async (payload: NewAddressPayload) => {
  if (payload.isMainAddress)
    await prisma.address.updateMany({
      where: { userId: payload.userId, isMainAddress: true },
      data: { isMainAddress: false },
    });
  return await prisma.address.create({
    data: { ...payload },
  });
};

export const getUserAddress = async (userId: number) => {
  return await prisma.address.findMany({ where: { userId }, orderBy: { isMainAddress: 'desc' } });
};

export const deleteAddress = async (userId: number, addressId: number) => {
  return await prisma.address.delete({ where: { userId, id: addressId } });
};

export const updateAddress = async (userId: number, addressId: number, payload: UpdateAddressPayload) => {
  if (payload.isMainAddress) {
    await prisma.address.updateMany({
      where: { userId, isMainAddress: true },
      data: { isMainAddress: false },
    });
  }
  return await prisma.address.update({ where: { id: addressId, userId }, data: { ...payload } });
};
