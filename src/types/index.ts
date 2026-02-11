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
}

export interface MapViewState extends LatLng {
  zoom: number
}
