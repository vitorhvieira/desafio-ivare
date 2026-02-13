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
    <div className="w-full h-screen">
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
                <p>Buscando endereço...</p>
              ) : (
                <div>
                  {selectedPoint.lat.toFixed(4)}
                  {selectedPoint.lng.toFixed(4)}
                  {data && (
                    <div>
                      <p>{data.address}</p>
                      <button
                        type="button"
                        onClick={() => {
                          add(data)
                          clearSelection()
                        }}
                      >
                        Salvar como favorito
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
