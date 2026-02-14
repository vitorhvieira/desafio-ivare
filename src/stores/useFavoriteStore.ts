import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { FavoriteLocation, Location } from "../types"

interface FavoriteStore {
  locations: FavoriteLocation[]
  add: (location: Location) => void
  remove: (id: string) => void
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    set => ({
      locations: [],
      add: location =>
        set(state => {
          const alreadyExists = state.locations.some(
            item => item.lat === location.lat && item.lng === location.lng
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
    }),
    { name: "favorite-locations-storage" }
  )
)
