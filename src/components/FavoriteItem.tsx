interface FavoriteItemProps {
  address: string
  lat: number
  lng: number
  onRemove: () => void
  onNavigate: () => void
}

export function FavoriteItem({
  address,
  lat,
  lng,
  onNavigate,
  onRemove,
}: FavoriteItemProps) {
  return (
    <li>
      <h2>{address}</h2>
      <p>{lat.toFixed(4)}</p>
      <p>{lng.toFixed(4)}</p>
      <button type="button" onClick={onNavigate}>
        Ir ate o Local Favorito
      </button>
      <button type="button" onClick={onRemove}>
        Remover do Favorito
      </button>
    </li>
  )
}
