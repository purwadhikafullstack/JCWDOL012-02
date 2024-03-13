import { createStore } from 'zustand/vanilla';
import { useStore, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { z } from 'zod';
import { jwtDecode } from 'jwt-decode';

const resetters: (() => void)[] = [];

const TokenDataSchema = z.object({
  userId: z.number(),
});

type TokenData = z.infer<typeof TokenDataSchema>;

const initialAuthState = {
  accessToken: '',
  accessTokenData: '',
  refreshToken: '',
};

type AuthStore = {
  accessToken: string | undefined;
  accessTokenData: TokenData | undefined;
  refreshToken: string | undefined;
  actions: {
    setAccessToken: (accessToken: string) => void;
    setRefreshToken: (refreshToken: string) => void;
    getAccessToken: () => string;
    init: () => void;
    clearTokens: () => void;
  };
};

export const decodeAccessToken = (accessToken: string) => TokenDataSchema.parse(jwtDecode<TokenData>(accessToken));

export const authStore = createStore<AuthStore>()(
  devtools(
    (set, get) => ({
      accessToken: undefined,
      accessTokenData: undefined,
      refreshToken: undefined,
      actions: {
        setAccessToken: (accessToken: string | undefined) => {
          localStorage.setItem('accessToken', accessToken || '');
          const accessTokenData = (() => {
            try {
              return accessToken ? decodeAccessToken(accessToken) : undefined;
            } catch (error) {
              console.error(error);
              return undefined;
            }
          })();
          set({
            accessToken,
            accessTokenData,
          });
        },
        setRefreshToken: (refreshToken: string | undefined) =>
          set({
            refreshToken,
          }),
        getAccessToken: () => localStorage.getItem('accessToken') || '',
        init: () => {
          const { setAccessToken, setRefreshToken } = get().actions;
          setAccessToken(localStorage.getItem('accessToken')!);
          setRefreshToken(localStorage.getItem('refreshToken')!);
        },
        clearTokens: () =>
          set({
            accessToken: undefined,
            accessTokenData: undefined,
            refreshToken: undefined,
          }),
      },
    }),
    {
      name: 'auth-store',
      enabled: true,
    },
  ),
);

export type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;

type Params<U> = Parameters<typeof useStore<typeof authStore, U>>;

const accessTokenSelector = (state: ExtractState<typeof authStore>) => state.accessToken;
const accessTokenDataSelector = (state: ExtractState<typeof authStore>) => state.accessTokenData;
const refreshTokenSelector = (state: ExtractState<typeof authStore>) => state.refreshToken;
const actionsSelector = (state: ExtractState<typeof authStore>) => state.actions;

export const getAccessToken = () => accessTokenSelector(authStore.getState());
export const getAccessTokenData = () => accessTokenDataSelector(authStore.getState());
export const getRefreshToken = () => refreshTokenSelector(authStore.getState());
export const getActions = () => actionsSelector(authStore.getState());

export function useAuthStore<U>(selector: Params<U>[1]) {
  return useStore(authStore, selector);
}

export const useAccessToken = () => useAuthStore(accessTokenSelector);
export const useAccessTokenData = () => useAuthStore(accessTokenDataSelector);
export const useRefreshToken = () => useAuthStore(refreshTokenSelector);
export const useActions = () => useAuthStore(actionsSelector);
