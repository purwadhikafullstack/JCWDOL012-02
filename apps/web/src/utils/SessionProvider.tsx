'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore, type StoreApi } from 'zustand';

import { type SessionStore, createSessionStore } from '@/store/sessionStore';

export const SessionStoreContext = createContext<StoreApi<SessionStore> | null>(null);

export interface SessionStoreProviderProps {
  children: ReactNode;
}

export const SessionStoreProvider = ({ children }: SessionStoreProviderProps) => {
  const storeRef = useRef<StoreApi<SessionStore>>();
  if (!storeRef.current) {
    storeRef.current = createSessionStore();
  }

  return <SessionStoreContext.Provider value={storeRef.current}>{children}</SessionStoreContext.Provider>;
};

export const useSessionStore = <T,>(selector: (store: SessionStore) => T): T => {
  const sessionStoreContext = useContext(SessionStoreContext);
  if (!sessionStoreContext) {
    throw new Error(`useSessionStore must be use within SessionStoreProvider`);
  }
  return useStore(sessionStoreContext, selector);
};
