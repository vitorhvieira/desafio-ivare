import { FaMapMarkedAlt, FaTrash } from "react-icons/fa"

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
    <li className="p-3 border-b border-gray-200 hover:bg-gray-50">
      <h3 className="text-sm font-medium text-gray-800 truncate">{address}</h3>
      <p className="text-xs text-gray-500">
        {lat.toFixed(4)} {lng.toFixed(4)}
      </p>

      <div className="flex gap-2 items-center justify-center">
        <button
          type="button"
          aria-label="Navegar"
          className="flex gap-1 text-sm text-blue-600  hover:text-blue-800 items-center cursor-pointer"
          onClick={onNavigate}
        >
          <FaMapMarkedAlt />
          Navegar
        </button>
        <button
          type="button"
          aria-label="Remover"
          className="flex gap-1 text-sm text-red-500  hover:text-red-700 items-center cursor-pointer"
          onClick={onRemove}
        >
          <FaTrash />
          Remover
        </button>
      </div>
    </li>
  )
}
