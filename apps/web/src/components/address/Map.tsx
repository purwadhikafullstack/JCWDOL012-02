'use client';

import LocationMarker from './LocationMarker';
import { useAddressStore } from '@/store/locationStore';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  const { setPosition, position } = useAddressStore();

  return (
    <MapContainer
      center={position ? position : [-6.2, 106.816666]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: 'calc(100% - 42px)', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker position={position ?? { lat: -6.2, lng: 106.816666 }} setPosition={setPosition} />
    </MapContainer>
  );
}
