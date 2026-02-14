import type { Location } from "../types"

interface MapboxFeature {
  properties: MapboxProperties
}

interface MapboxResponse {
  features: MapboxFeature[]
}

interface MapboxCoordinates {
  latitude: number
  longitude: number
}

interface MapboxProperties {
  full_address: string
  coordinates: MapboxCoordinates
}

export async function searchAddress(query: string): Promise<Location[]> {
  const response = await fetch(
    `https://api.mapbox.com/search/geocode/v6/forward?q=${query}&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}&language=pt`
  )

  if (!response.ok) {
    throw new Error("Erro ao buscar o endereço!")
  }

  const responseData: MapboxResponse = await response.json()

  return responseData.features.map(data => ({
    address: data.properties.full_address,

    lat: Number(data.properties.coordinates.latitude),
    lng: Number(data.properties.coordinates.longitude),
  }))
}

export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<Location> {
  const response = await fetch(
    `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}&language=pt`
  )

  if (!response.ok) {
    throw new Error("Erro no endereço!")
  }

  const responseData: MapboxResponse = await response.json()

  return {
    address: responseData.features[0].properties.full_address,
    lat: Number(responseData.features[0].properties.coordinates.latitude),
    lng: Number(responseData.features[0].properties.coordinates.longitude),
  }
}
