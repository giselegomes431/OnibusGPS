export interface Schedule {
  weekdays: string[];
  saturdays: string[];
  sundays: string[];
}

export interface BusLine {
  id: string;
  name: string; // Ex: "Urbis II x Centro"
  stops: string[]; // Lista de nomes dos pontos onde essa linha passa
  schedule: Schedule;
}