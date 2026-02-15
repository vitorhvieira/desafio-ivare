import { type ChangeEvent, useState } from "react"
import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa"
import { useSearch } from "../hooks/useSearch"
import { useFavoriteStore } from "../stores/useFavoriteStore"
import { useMapStore } from "../stores/useMapStore"
import type { Location } from "../types"
import { isSameLocation } from "../utils/isSameLocation"
import { NameDialog } from "./NameDialog"
import { Skeleton } from "./Skeleton"

export function SearchBar() {
  const [inputValue, setInputValue] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [pendingResult, setPendingResult] = useState<Location | null>(null)

  const { updatePosition, selectPoint } = useMapStore()
  const { add, remove, locations } = useFavoriteStore()

  const { data, isLoading, error } = useSearch(searchTerm)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  function handleSearch() {
    if (!inputValue.trim()) return setSearchTerm("")
    setSearchTerm(inputValue)
  }

  function handleFavorite(result: Location) {
    const existing = locations.find(location =>
      isSameLocation(location, result)
    )

    if (existing) {
      return remove(existing.id)
    }

    setPendingResult(result)
    setDialogOpen(true)
  }

  return (
    <div className="p-4 border-b border-gray-200">
      <h2 className="text-lg font-bold text-gray-800 mb-2">Campo de busca</h2>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
          placeholder="Digite um endereço..."
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          aria-label="Buscar Endereço"
          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
          onClick={handleSearch}
        >
          <FaSearch />
        </button>
      </div>

      {isLoading && <Skeleton lines={["w-full", "w-5/6", "w-full", "w-4/5"]} />}

      {error && <p className="text-sm text-red-500 mt-2">Erro na busca</p>}

      <ul className="mt-2 space-y-1">
        {data?.map(result => {
          const isFavorite = locations.some(location =>
            isSameLocation(location, result)
          )

          return (
            <li
              key={result.address}
              className="flex items-center justify-between gap-2 p-2 hover:bg-gray-50 rounded"
            >
              <button
                type="button"
                className="text-sm text-gray-700 hover:text-blue-600 text-left truncate flex-1 cursor-pointer"
                onClick={() => {
                  updatePosition({
                    lat: result.lat,
                    lng: result.lng,
                    zoom: 15,
                  })
                  selectPoint({
                    lat: result.lat,
                    lng: result.lng,
                  })
                }}
              >
                {result.address}
              </button>

              <button
                type="button"
                className="cursor-pointer"
                onClick={() => handleFavorite(result)}
              >
                {isFavorite ? (
                  <FaHeart className="text-red-400" />
                ) : (
                  <FaRegHeart className="text-gray-400" />
                )}
              </button>
            </li>
          )
        })}
      </ul>

      <NameDialog
        isOpen={dialogOpen}
        onCancel={() => {
          setDialogOpen(false)
          setPendingResult(null)
        }}
        onConfirm={name => {
          if (!pendingResult) return

          add({
            ...pendingResult,
            name,
          })

          setDialogOpen(false)
          setPendingResult(null)
        }}
      />
    </div>
  )
}
