import { useFavoriteStore } from "../stores/useFavoriteStore"
import { useMapStore } from "../stores/useMapStore"
import { FavoriteItem } from "./FavoriteItem"

export function FavoriteList() {
  const { updatePosition } = useMapStore()
  const { locations, remove } = useFavoriteStore()

  return (
    <div>
      <h1>Favoritos ({locations.length})</h1>
      {locations.length === 0 && <h1>Nenhum local favoritado ainda...</h1>}
      <ul>
        {locations.map(location => (
          <FavoriteItem
            key={location.id}
            address={location.address}
            lat={location.lat}
            lng={location.lng}
            onNavigate={() =>
              updatePosition({
                lat: location.lat,
                lng: location.lng,
                zoom: 15,
              })
            }
            onRemove={() => remove(location.id)}
          />
        ))}
      </ul>
    </div>
  )
}
