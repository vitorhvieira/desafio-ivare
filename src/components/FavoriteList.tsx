import { useState } from "react"
import { FaHeart } from "react-icons/fa"
import { useFavoriteStore } from "../stores/useFavoriteStore"
import { useMapStore } from "../stores/useMapStore"
import { FavoriteItem } from "./FavoriteItem"
import { NameDialog } from "./NameDialog"

export function FavoriteList() {
  const { updatePosition, selectPoint } = useMapStore()
  const { locations, remove, edit } = useFavoriteStore()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState("")
  const [editingName, setEditingName] = useState("")

  function handleEdit(id: string, currentName: string) {
    setEditingId(id)
    setEditingName(currentName)
    setDialogOpen(true)
  }

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
            id={location.id}
            name={location.name}
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
            onEdit={() => handleEdit(location.id, location.name)}
          />
        ))}
      </ul>

      <NameDialog
        isOpen={dialogOpen}
        defaultValue={editingName}
        onCancel={() => setDialogOpen(false)}
        onConfirm={name => {
          edit(editingId, name)
          setDialogOpen(false)
          setEditingId("")
          setEditingName("")
        }}
      />
    </div>
  )
}
