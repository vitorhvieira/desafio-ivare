import { FaHeart } from "react-icons/fa"
import { useFavoriteStore } from "../stores/useFavoriteStore"
import { useMapStore } from "../stores/useMapStore"
import { FavoriteItem } from "./FavoriteItem"

export function FavoriteList() {
  const { updatePosition, selectPoint } = useMapStore()
  const { locations, remove } = useFavoriteStore()

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
        <FaHeart className="text-red-500" />
        Favoritos ({locations.length})
      </h2>
      {locations.length === 0 && (
        <p className="text-sm text-gray-400 mt-4 text-center">
          Nenhum local favoritado ainda...
        </p>
      )}
      <ul className="mt-2">
        {locations.map(location => (
          <FavoriteItem
            key={location.id}
            address={location.address}
            lat={location.lat}
            lng={location.lng}
            onNavigate={() => {
              updatePosition({
                lat: location.lat,
                lng: location.lng,
                zoom: 15,
              })
              selectPoint({
                lat: location.lat,
                lng: location.lng,
              })
            }}
            onRemove={() => remove(location.id)}
          />
        ))}
      </ul>
    </div>
  )
}
