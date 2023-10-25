import './LMap.css'
import { useEffect, useRef } from 'react'
import L from 'leaflet'

/* eslint-disable react/prop-types */
export const LMap = (props) => {
  const mapRef = useRef(null)

  useEffect(() => {
    mapRef.current = L.map('mapId', {
      center: [props.latitude, props.longitude],
      zoom: 13
    })
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(mapRef.current)
    L.marker([props.latitude, props.longitude]).addTo(mapRef.current)

    return () => mapRef.current.remove()
  }, [])

  return (
    <div id="mapId"></div>
  )
}
