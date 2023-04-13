import { User } from 'src/models/user';
import { create } from 'zustand';

export interface AuthStoreState {
  accessToken: string;
  currentUser?: User;
  setAccessToken: (token: string) => void;
  setCurrentUser: (user: User) => void;
}

export const useAuthStore = create<AuthStoreState>(set => ({
  accessToken: '',
  setAccessToken: (token: string) => set({ accessToken: token }),
  setCurrentUser: (user: User) => set({ currentUser: user }),
}));
