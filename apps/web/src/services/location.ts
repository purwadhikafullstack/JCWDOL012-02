import { OpenCageProvider } from 'leaflet-geosearch';

export const openCageProvider = new OpenCageProvider({
  params: { key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY! },
});
