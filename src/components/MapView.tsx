import "mapbox-gl/dist/mapbox-gl.css"
import { useEffect, useRef, useState } from "react"
import { FaHeart } from "react-icons/fa"
import { Map as MapGL, type MapRef, Marker, Popup } from "react-map-gl/mapbox"
import { useReverseGeocode } from "../hooks/useReverseGeocode"
import { useFavoriteStore } from "../stores/useFavoriteStore"
import { useMapStore } from "../stores/useMapStore"
import { isSameLocation } from "../utils/isSameLocation"
import { NameDialog } from "./NameDialog"
import { Skeleton } from "./Skeleton"

export function MapView() {
  const { location, selectPoint, selectedPoint, clearSelection } = useMapStore()
  const { data, isLoading } = useReverseGeocode(
    selectedPoint?.lat ?? null,
    selectedPoint?.lng ?? null
  )
  const { add, locations, remove } = useFavoriteStore()
  const mapRef = useRef<MapRef>(null)
  const isFirstRender = useRef(true)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    mapRef.current?.flyTo({
      center: [location.lng, location.lat],
      zoom: location.zoom,
      duration: 1500,
    })
  }, [location.lat, location.lng, location.zoom])

  const existingFavorite = data
    ? locations.find(loc => isSameLocation(loc, data))
    : undefined

  return (
    <div className="w-full h-full">
      <MapGL
        ref={mapRef}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        initialViewState={{
          latitude: location.lat,
          longitude: location.lng,
          zoom: location.zoom,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: "100%", height: "100%" }}
        onClick={e => selectPoint({ lat: e.lngLat.lat, lng: e.lngLat.lng })}
      >
        {selectedPoint && (
          <>
            <Marker
              latitude={selectedPoint.lat}
              longitude={selectedPoint.lng}
            />

            <Popup
              latitude={selectedPoint.lat}
              longitude={selectedPoint.lng}
              onClose={clearSelection}
              closeOnClick={false}
            >
              <div className="p-1 pr-4">
                {isLoading ? (
                  <Skeleton lines={["w-24", "w-48", "w-20"]} />
                ) : (
                  <>
                    <p className="text-xs text-gray-500">
                      {selectedPoint.lat.toFixed(4)} /{" "}
                      {selectedPoint.lng.toFixed(4)}
                    </p>
                    {data && (
                      <div>
                        <p className="text-sm font-medium text-gray-800 mt-1">
                          {data.address}
                        </p>
                        {existingFavorite ? (
                          <button
                            type="button"
                            aria-label="Desfavoritar"
                            onClick={() => remove(existingFavorite.id)}
                            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 mt-2 cursor-pointer"
                          >
                            <FaHeart />
                            <span>Desfavoritar</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            aria-label="Favoritar"
                            onClick={() => setDialogOpen(true)}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mt-2 cursor-pointer"
                          >
                            <FaHeart />
                            <span>Favoritar</span>
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </Popup>
          </>
        )}
      </MapGL>
      <NameDialog
        onConfirm={name => {
          if (!data) return
          add({ ...data, name })
          clearSelection()
          setDialogOpen(false)
        }}
        isOpen={dialogOpen}
        onCancel={() => setDialogOpen(false)}
      />
    </div>
  )
}
