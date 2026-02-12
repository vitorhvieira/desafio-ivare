import { SearchBar } from "./SearchBar"
import { MapView } from "./MapView"

export function Layout() {
  return (
    <main className="flex h-screen">
      <div className="w-80">
        <SearchBar />
      </div>
      <div className="flex-1 h-full">
        <MapView />
      </div>
    </main>
  )
}
