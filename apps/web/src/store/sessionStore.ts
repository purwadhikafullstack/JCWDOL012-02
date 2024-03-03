import { User } from '@/@types/user';
import { createStore } from 'zustand/vanilla';
import CryptoJS, { AES } from 'crypto-js';

export const initialUser: User = {
  id: 0,
  name: '',
  email: '',
  role: '',
  phone: '',
  image: '',
  createdAt: '',
  updatedAt: '',
  deleted: false,
  authType: '',
};

const initialSession: SessionState = {
  isAuthenticated: false,
  user: initialUser,
  isSuperAdmin: false,
  isWarehouseAdmin: false,
};

export type SessionState = {
  isAuthenticated: boolean;
  user: User;
  isSuperAdmin: boolean;
  isWarehouseAdmin: boolean;
};

export type SessionAction = {
  login: (user: User) => void;
  reset: () => void;
  isSocialAuth: () => boolean;
  setLocalStorage: (user: User) => void;
  getLocalStorage: () => void;
  socialAuth: (status: boolean) => void;
};

export type SessionStore = SessionState & SessionAction;

export const createSessionStore = (initState: SessionState = initialSession) => {
  return createStore<SessionStore>((set) => ({
    ...initState,
    login: (user) => {
      set({
        isAuthenticated: true,
        user,
        isSuperAdmin: user.role === 'SuperAdmin',
        isWarehouseAdmin: user.role === 'WarehouseAdmin',
      });
    },
    reset: () => {
      localStorage.removeItem('user');
      set({ isAuthenticated: false, user: initialUser });
    },
    setLocalStorage: (user) => {
      const encryptedUser = AES.encrypt(JSON.stringify(user), 'password').toString();
      localStorage.setItem('user', encryptedUser);
    },
    socialAuth: (status: boolean) => {
      localStorage.setItem('isSocialAuth', JSON.stringify(status));
    },
    isSocialAuth: () => JSON.parse(localStorage.getItem('isSocialAuth') || 'true'),
    getLocalStorage: () => {
      let encryptedUser = localStorage.getItem('user');
      if (!encryptedUser) return set({ isAuthenticated: false, user: initialUser });
      let bytes = AES.decrypt(encryptedUser!, 'password');
      let user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      set({
        isAuthenticated: true,
        user,
        isSuperAdmin: user.role === 'SuperAdmin',
        isWarehouseAdmin: user.role === 'WarehouseAdmin',
      });
    },
  }));
};
