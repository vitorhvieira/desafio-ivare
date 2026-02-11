import { create } from "zustand"
import type { MapViewState } from "../types"

interface MapStore {
  location: MapViewState
  updatePosition: (position: MapViewState) => void
}

export const useMapStore = create<MapStore>(set => ({
  location: { lat: -18.921872714917058, lng: -48.27838790893658, zoom: 5 },
  updatePosition: position =>
    set({
      location: position,
    }),
}))
