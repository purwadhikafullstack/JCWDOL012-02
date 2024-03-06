import { User } from '@/@types/user';
import { refetchUser } from '@/services/auth';

export const updateUser = (setLocalStorage: (user?: User) => void) => {
  refetchUser().then((data) => {
    setLocalStorage(data);
  });
};
