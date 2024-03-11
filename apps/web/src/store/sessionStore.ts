import { User } from '@/@types/user';
import { fetchUser } from '@/services/auth';
import { createStore } from 'zustand/vanilla';

export const initialUser: User = {
  id: 0,
  name: '',
  email: '',
  role: '',
  phone: '',
  image: '',
  bio: '',
  createdAt: '',
  updatedAt: '',
  deleted: false,
  authType: '',
};

const initialSession: SessionState = {
  isAuthenticated: false,
  user: initialUser,
};

export type SessionState = {
  user: User;
  isAuthenticated: boolean;
};

export type SessionAction = {
  setUser: (user: User) => void;
  resetUser: () => void;
  getUser: () => void;
  socialAuth: (status: boolean) => void;
};

export type SessionStore = SessionState & SessionAction;

export const createSessionStore = (initState: SessionState = initialSession) => {
  return createStore<SessionStore>((set) => ({
    ...initState,
    setUser: async (user) => {
      set({ isAuthenticated: true, user });
    },
    getUser: async () => {
      await fetchUser().then((user) => set({ isAuthenticated: true, user }));
    },
    resetUser: () => {
      set({ isAuthenticated: false, user: initialUser });
    },
    socialAuth: (status: boolean) => localStorage.setItem('isSocialAuth', JSON.stringify(status)),
  }));
};

export const { setUser, resetUser, socialAuth } = createSessionStore().getState();
