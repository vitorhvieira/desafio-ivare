import "leaflet/dist/leaflet.css"
import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import { useMapStore } from "../stores/useMapStore"

function FlyToLocation() {
  const { location } = useMapStore()
  const map = useMap()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    map.flyTo([location.lat, location.lng], location.zoom, {
      duration: 1.5,
    })
  }, [location.lat, location.lng, location.zoom, map])
  return null
}

export function MapView() {
  const { location } = useMapStore()

  return (
    <div className="w-full h-screen">
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={location.zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyToLocation />
      </MapContainer>
    </div>
  )
}
