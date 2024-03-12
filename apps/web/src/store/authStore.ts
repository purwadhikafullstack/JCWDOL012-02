import { create } from 'zustand';
import { User } from '@/@types/user';

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

const initialAuthState = {
  isAuthenticated: false,
  user: initialUser,
};

type State = {
  isAuthenticated: boolean;
  user: User;
};
type Action = {
  login: (user: User) => void;
  logout: () => void;
};

export const authStore = create<State & Action>((set) => ({
  ...initialAuthState,
  login: (user) => {
    set({ isAuthenticated: true, user });
  },
  logout: () => {
    localStorage.removeItem('user');
    set({ isAuthenticated: false, user: initialUser });
  },
}));
