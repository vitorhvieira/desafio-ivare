import { SearchBar } from "./SearchBar"
import { MapView } from "./MapView"
import { FavoriteList } from "./FavoriteList"

export function Layout() {
  return (
    <main className="flex h-screen">
      <div className="w-80 overflow-y-auto">
        <SearchBar />
        <FavoriteList />
      </div>
      <div className="flex-1 h-full">
        <MapView />
      </div>
    </main>
  )
}
