import { useState, type ChangeEvent } from "react"
import { useSearch } from "../hooks/useSearch"
import { useMapStore } from "../stores/useMapStore"
import { useFavoriteStore } from "../stores/useFavoriteStore"
import { FaHeart, FaSearch, FaRegHeart } from "react-icons/fa"

export function SearchBar() {
  const [inputValue, setInputValue] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
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

  function handleFavorite(lat: number, lng: number, address: string) {
    const find = locations.find(
      location => location.lat === lat && location.lng === lng
    )

    if (find) {
      return remove(find.id)
    }

    add({
      address,
      lat,
      lng,
    })
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
          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
          onClick={handleSearch}
        >
          <FaSearch />
        </button>
      </div>

      {isLoading && (
        <p className="text-sm text-gray-500 mt-2">Carregando....</p>
      )}
      {error && <p className="text-sm text-red-500 mt-2">Erro na busca</p>}

      <ul className="mt-2 space-y-1">
        {data?.map(result => {
          const isFavorite = locations.some(
            location =>
              location.lat === result.lat && location.lng === result.lng
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
                  updatePosition({ lat: result.lat, lng: result.lng, zoom: 15 })
                  selectPoint({ lat: result.lat, lng: result.lng })
                }}
              >
                {result.address}
              </button>
              <button
                type="button"
                className="cursor-pointer"
                onClick={() =>
                  handleFavorite(result.lat, result.lng, result.address)
                }
              >
                {isFavorite ? (
                  <FaHeart className="text-red-400 hover:text-red-600" />
                ) : (
                  <FaRegHeart className="text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
