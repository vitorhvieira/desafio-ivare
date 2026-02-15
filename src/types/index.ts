export interface LatLng {
  lat: number
  lng: number
}

export interface Location extends LatLng {
  address: string
}

export interface FavoriteLocation extends Location {
  id: string
  createdAt: number
  name: string
}

export interface MapViewState extends LatLng {
  zoom: number
}
