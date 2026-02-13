import { SearchBar } from "./SearchBar"
import { MapView } from "./MapView"
import { FavoriteList } from "./FavoriteList"

export function Layout() {
  return (
    <main className="flex flex-col h-screen md:flex-row">
      <div className="w-full h-64 overflow-y-auto md:h-full md:w-72 lg:w-80 border-b md:border-b-0 md:border-r border-gray-200">
        <SearchBar />
        <FavoriteList />
      </div>
      <div className="flex-1 min-h-0">
        <MapView />
      </div>
    </main>
  )
}
