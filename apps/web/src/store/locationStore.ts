import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface IPosition {
  lat: number;
  lng: number;
}

interface AddressStore {
  position: IPosition | null;
  positionDetail: string | null;
  step: number;
  setPosition: (location: IPosition | null) => void;
  setPositionDetail: (positionDetail: string | null) => void;
  setStep: (step: number) => void;
}

export const useAddressStore = create(
  persist<AddressStore>(
    (set) => ({
      position: null,
      positionDetail: null,
      step: 0,
      setPosition: (position) => set({ position }),
      setPositionDetail: (positionDetail) => set({ positionDetail }),
      setStep: (step) => set({ step }),
    }),
    {
      name: 'location',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
