import { FaMapMarkedAlt, FaPen, FaTrash } from "react-icons/fa"

interface FavoriteItemProps {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  onRemove: () => void
  onNavigate: () => void
  onEdit: (id: string, currentName: string) => void
}

export function FavoriteItem({
  id,
  name,
  address,
  lat,
  lng,
  onNavigate,
  onRemove,
  onEdit,
}: FavoriteItemProps) {
  return (
    <li className="p-3 border-b border-gray-200 hover:bg-gray-50">
      <div className="flex justify-between">
        <h3 className="text-sm font-semibold text-gray-800 truncate">{name}</h3>
        <button
          type="button"
          aria-label="Editar"
          className="flex gap-1 text-sm text-yellow-600 hover:text-yellow-800 items-center cursor-pointer"
          onClick={() => onEdit(id, name)}
        >
          <FaPen />
          Editar
        </button>
      </div>

      <h4 className="text-sm text-gray-600 truncate">{address}</h4>

      <p className="text-xs text-gray-500">
        {lat.toFixed(4)} {lng.toFixed(4)}
      </p>

      <div className="flex gap-3 items-center justify-center mt-2">
        <button
          type="button"
          aria-label="Navegar"
          className="flex gap-1 text-sm text-blue-600 hover:text-blue-800 items-center cursor-pointer"
          onClick={onNavigate}
        >
          <FaMapMarkedAlt />
          Navegar
        </button>

        <button
          type="button"
          aria-label="Remover"
          className="flex gap-1 text-sm text-red-500 hover:text-red-700 items-center cursor-pointer"
          onClick={onRemove}
        >
          <FaTrash />
          Remover
        </button>
      </div>
    </li>
  )
}
