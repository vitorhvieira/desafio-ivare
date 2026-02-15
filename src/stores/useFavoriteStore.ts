import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { FavoriteLocation, Location } from "../types"
import { isSameLocation } from "../utils/isSameLocation"

interface FavoriteStore {
  locations: FavoriteLocation[]
  add: (location: Location & { name: string }) => void
  remove: (id: string) => void
  edit: (id: string, name: string) => void
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    set => ({
      locations: [],
      add: location =>
        set(state => {
          const alreadyExists = state.locations.some(item =>
            isSameLocation(item, location)
          )

          if (alreadyExists) {
            return {
              locations: state.locations,
            }
          }
          return {
            locations: [
              ...state.locations,
              {
                id: crypto.randomUUID(),
                name: location.name,
                lat: location.lat,
                lng: location.lng,
                address: location.address,
                createdAt: Date.now(),
              },
            ],
          }
        }),
      remove: id =>
        set(state => ({
          locations: state.locations.filter(location => location.id !== id),
        })),
      edit: (id, name) =>
        set(state => ({
          locations: state.locations.map(item =>
            item.id === id ? { ...item, name } : item
          ),
        })),
    }),

    { name: "favorite-locations-storage" }
  )
)
