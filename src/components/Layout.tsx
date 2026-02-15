import { FavoriteList } from "./FavoriteList"
import { MapView } from "./MapView"
import { SearchBar } from "./SearchBar"

export function Layout() {
  return (
    <main className="flex flex-col h-screen md:flex-row">
      <div className="w-full h-90 overflow-y-auto md:h-full md:w-72 lg:w-80 border-b md:border-b-0 md:border-r border-gray-200">
        <h1 className="flex items-center justify-center text-base font-bold p-4 border-b border-gray-200 ">
          Mapa de Locais Favoritos
        </h1>
        <SearchBar />
        <FavoriteList />
      </div>
      <div className="flex-1 min-h-0">
        <MapView />
      </div>
    </main>
  )
}
