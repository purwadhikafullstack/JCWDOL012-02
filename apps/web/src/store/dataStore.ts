import { getAllCity, getAllProvince } from '@/services/data';
import { create } from 'zustand';

interface DataStore {
  cities: ICity[];
  provinces: IProvince[];
  getCities: () => Promise<void>;
  getProvinces: () => Promise<void>;
}

export const useDataStore = create<DataStore>((set) => ({
  cities: [],
  provinces: [],
  getCities: async () => {
    await getAllCity().then((res) => {
      set({ cities: res });
    });
  },
  getProvinces: async () => {
    await getAllProvince().then((res) => {
      set({ provinces: res });
    });
  },
}));
