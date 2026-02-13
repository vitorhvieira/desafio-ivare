import { useQuery } from "@tanstack/react-query"
import { reverseGeocode } from "../services/nominatim"

export function useReverseGeocode(lat: number | null, lng: number | null) {
  return useQuery({
    queryKey: ["reverseGeocode", lat, lng],
    queryFn: () => reverseGeocode(lat!, lng!),
    enabled: lat !== null && lng !== null,
    staleTime: 1000 * 60 * 5,
  })
}
