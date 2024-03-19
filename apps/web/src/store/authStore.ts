import { z } from 'zod';
import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

const TokenDataSchema = z.object({
  userId: z.number(),
  role: z.string(),
});

type TokenData = z.infer<typeof TokenDataSchema>;

type AuthStore = {
  accessToken: string | undefined;
  accessTokenData: TokenData | undefined;
  actions: {
    setAccessToken: (accessToken: string) => void;
    getAccessToken: () => string;
    init: () => void;
  };
};

export const decodeAccessToken = (accessToken: string) => TokenDataSchema.parse(jwtDecode<TokenData>(accessToken));

export const authStore = createStore<AuthStore>()(
  devtools(
    (set, get) => ({
      accessToken: undefined,
      accessTokenData: undefined,
      actions: {
        setAccessToken: (accessToken: string | undefined) => {
          localStorage.setItem('accessToken', accessToken || '');
          const accessTokenData = (() => {
            try {
              return accessToken ? decodeAccessToken(accessToken) : undefined;
            } catch (error) {
              return undefined;
            }
          })();
          set({
            accessToken,
            accessTokenData,
          });
        },
        getAccessToken: () => localStorage.getItem('accessToken') || '',
        init: () => {
          const { setAccessToken } = get().actions;
          setAccessToken(localStorage.getItem('accessToken')!);
        },
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
const actionsSelector = (state: ExtractState<typeof authStore>) => state.actions;

export const getAccessToken = () => accessTokenSelector(authStore.getState());
export const getAccessTokenData = () => accessTokenDataSelector(authStore.getState());
export const getActions = () => actionsSelector(authStore.getState());

export function useAuthStore<U>(selector: Params<U>[1]) {
  return useStore(authStore, selector);
}

export const useAccessToken = () => useAuthStore(accessTokenSelector);
export const useAccessTokenData = () => useAuthStore(accessTokenDataSelector);
export const useActions = () => useAuthStore(actionsSelector);
