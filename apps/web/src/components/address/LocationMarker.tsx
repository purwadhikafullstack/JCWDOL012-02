import L from 'leaflet';
import { IPosition } from '@/store/locationStore';
import { useEffect, useRef } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { SearchControl, OpenCageProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

interface IProps {
  position: IPosition;
  setPosition: (position: IPosition) => void;
}

const icon = new L.Icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function LocationMarker({ position, setPosition }: IProps) {
  const markerRef = useRef<any>(null);

  const map = useMapEvents({
    click: (e) => {
      setPosition(e.latlng);
    },
  });

  map.on('geosearch/showlocation', (e: any) => {
    // @ts-ignore
    setPosition({ lat: e.location.y, lng: e.location.x });
  });

  // @ts-ignore
  useEffect(() => {
    const searchControl = SearchControl({
      style: 'bar',
      showMarker: false,
      showPopup: false,
      notFoundMessage: 'Location not found, try again.',
      provider: new OpenCageProvider({
        params: { key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY! },
      }),
    });

    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (response) => {
        setPosition({ lng: response.coords.longitude, lat: response.coords.latitude });
        map.flyTo({ lng: response.coords.longitude, lat: response.coords.latitude });
      },
      (err) => alert(err.message),
      { timeout: 15000, enableHighAccuracy: true },
    );
  }, [map, setPosition]);

  function dragend() {
    if (markerRef.current) {
      const currPosition = markerRef.current.getLatLng();
      setPosition(currPosition);
    }
  }

  return (
    <Marker position={position} icon={icon} ref={markerRef} draggable eventHandlers={{ dragend }}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
