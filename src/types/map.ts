export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface BusStop {
  nome: string;
  coordenadas: Coordinates;
}