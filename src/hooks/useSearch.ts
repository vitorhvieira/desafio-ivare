import { useQuery } from "@tanstack/react-query"
import { searchAddress } from "../services/mapboxGeocoding"

export function useSearch(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchAddress(query),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
  })
}
