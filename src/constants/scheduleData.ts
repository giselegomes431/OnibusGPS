import { BusLine } from '../types/schedules';

export const busLines: BusLine[] = [
  {
    id: 'linha-01',
    name: 'Urbis II x Centro',
    // IMPORTANTE: Lista de pontos onde essa linha passa. Use os mesmos nomes de 'mapData.ts'
    stops: ['Ginásio de Esportes', 'Praça da Bandeira', 'Feirinha'],
    schedule: {
      weekdays: ['06:00', '06:40', '07:20', '08:00', '08:40', '09:20', '10:00', '11:20', '12:00'],
      saturdays: ['06:30', '07:30', '08:30', '09:30', '10:30', '11:30', '12:30'],
      sundays: ['07:00', '09:00', '11:00', '13:00'],
    },
  },
  {
    id: 'linha-02',
    name: 'Parque das Exposições x Centro',
    stops: ['Praça da Bandeira', 'Feirinha'], // Esta linha não passa no Ginásio
    schedule: {
      weekdays: ['06:15', '07:15', '08:15', '09:15', '10:15', '11:15', '12:15'],
      saturdays: ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00'],
      sundays: [], // Exemplo de linha que não roda aos domingos
    },
  },
];