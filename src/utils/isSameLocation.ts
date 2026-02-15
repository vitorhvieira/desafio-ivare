import type { LatLng } from "../types"

export const isSameLocation = (a: LatLng, b: LatLng) => {
  return Math.abs(a.lat - b.lat) < 0.0002 && Math.abs(a.lng - b.lng) < 0.0002
}
