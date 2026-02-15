import { create } from "zustand"
import type { LatLng, MapViewState } from "../types"

interface MapStore {
  location: MapViewState
  updatePosition: (position: MapViewState) => void
  selectedPoint: LatLng | null
  selectPoint: (point: LatLng | null) => void
  clearSelection: () => void
  flyToCounter: number
}

export const useMapStore = create<MapStore>(set => ({
  location: { lat: -18.921872714917058, lng: -48.27838790893658, zoom: 12 },
  selectedPoint: null,
  flyToCounter: 0,
  updatePosition: position =>
    set(state => ({
      location: position,
      flyToCounter: state.flyToCounter + 1,
    })),
  selectPoint: point => set({ selectedPoint: point }),
  clearSelection: () => set({ selectedPoint: null }),
}))
