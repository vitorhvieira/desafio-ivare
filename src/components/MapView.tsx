import "leaflet/dist/leaflet.css"
import { useEffect, useRef } from "react"
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet"
import { useMapStore } from "../stores/useMapStore"
import { useReverseGeocode } from "../hooks/useReverseGeocode"
import { useFavoriteStore } from "../stores/useFavoriteStore"
import { FaHeart } from "react-icons/fa"

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

function ClickMap() {
  const { selectPoint } = useMapStore()
  useMapEvents({
    click: event => {
      selectPoint({ lat: event.latlng.lat, lng: event.latlng.lng })
    },
  })
  return null
}

export function MapView() {
  const { location, selectedPoint, clearSelection } = useMapStore()
  const { data, isLoading } = useReverseGeocode(
    selectedPoint?.lat ?? null,
    selectedPoint?.lng ?? null
  )
  const { add } = useFavoriteStore()

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={location.zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        {selectedPoint && (
          <Marker position={[selectedPoint.lat, selectedPoint.lng]}>
            <Popup>
              {isLoading ? (
                <p className="text-sm text-gray-500">Buscando endereço...</p>
              ) : (
                <div>
                  <p className="text-xs text-gray-500">
                    {selectedPoint.lat.toFixed(4)}/
                    {selectedPoint.lng.toFixed(4)}
                  </p>

                  {data && (
                    <div>
                      <p className="text-sm font-medium text-gray-800 mt-1">
                        {data.address}
                      </p>
                      <button
                        type="button"
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mt-2"
                        onClick={e => {
                          e.stopPropagation()
                          add(data)
                          clearSelection()
                        }}
                      >
                        <FaHeart /> <span>Favoritar</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </Popup>
          </Marker>
        )}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickMap />
        <FlyToLocation />
      </MapContainer>
    </div>
  )
}
