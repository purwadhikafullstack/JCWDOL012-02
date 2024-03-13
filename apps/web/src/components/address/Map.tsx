import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import LocationMarker from './LocationMarker';
import 'leaflet/dist/leaflet.css';

export interface IPosition {
  lat: number;
  lng: number;
}

export default function Map() {
  const [position, setPosition] = useState<IPosition | null>(null);
  console.log(position);

  return (
    <MapContainer
      center={position ? position : [-7.524202847092282, 112.28381170460374]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker
        position={position ?? { lat: -7.524202847092282, lng: 112.28381170460374 }}
        setPosition={setPosition}
      />
    </MapContainer>
  );
}
