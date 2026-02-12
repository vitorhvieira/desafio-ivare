import { useState, type ChangeEvent } from "react"
import { useSearch } from "../hooks/useSearch"
import { useMapStore } from "../stores/useMapStore"

export function SearchBar() {
  const [inputValue, setInputValue] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const { updatePosition } = useMapStore()

  const { data, isLoading, error } = useSearch(searchTerm)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  function handleSearch() {
    if (!inputValue.trim()) return
    setSearchTerm(inputValue)
  }

  return (
    <div>
      <h1>Campo de busca</h1>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button type="button" onClick={handleSearch}>
        Pesquisar
      </button>

      {isLoading && <p>Carregando....</p>}
      {error && <p>Erro na busca</p>}

      <ul>
        {data?.map(result => (
          <li key={result.address}>
            <button
              type="button"
              onClick={() =>
                updatePosition({ lat: result.lat, lng: result.lng, zoom: 15 })
              }
            >
              {result.address}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
