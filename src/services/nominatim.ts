import type { Location } from "../types"

interface NominatimRaw {
  display_name: string
  lat: string
  lon: string
}

export async function searchAddress(query: string): Promise<Location[]> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`,
    {
      headers: {
        "Accept-Language": "pt-BR",
      },
    }
  )

  if (!response.ok) {
    throw new Error("Erro ao buscar o endereço!")
  }

  const responseData: NominatimRaw[] = await response.json()

  return responseData.map(data => ({
    address: data.display_name,
    lat: Number(data.lat),
    lng: Number(data.lon),
  }))
}

export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<Location> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
    {
      headers: {
        "Accept-Language": "pt-BR",
      },
    }
  )

  if (!response.ok) {
    throw new Error("Erro no endereço!")
  }

  const responseData: NominatimRaw = await response.json()

  return {
    address: responseData.display_name,
    lat: Number(responseData.lat),
    lng: Number(responseData.lon),
  }
}
