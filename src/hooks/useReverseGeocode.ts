import { useQuery } from "@tanstack/react-query"
import { reverseGeocode } from "../services/mapboxGeocoding"

export function useReverseGeocode(lat: number | null, lng: number | null) {
  return useQuery({
    queryKey: ["reverseGeocode", lat, lng],
    queryFn: () => {
      if (lat === null || lng === null) {
        throw new Error("Latitude e Longitude invalidas")
      }
      return reverseGeocode(lat, lng)
    },
    enabled: lat !== null && lng !== null,
    staleTime: 1000 * 60 * 5,
  })
}
