export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
  image: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  authType: string;
}

export interface IAddress {
  id: number;
  fullAddress: string;
  isMainAddress: boolean;
  label: string;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  recipientName: string;
  userId: number;
}
