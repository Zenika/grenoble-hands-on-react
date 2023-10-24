import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import './LMap.css'

// eslint-disable-next-line react/prop-types
export const LMap = ({ latitude, longitude }) => {
  return (
    <MapContainer id={'mapId'} center={[latitude, longitude]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} />
    </MapContainer>
  )
}
