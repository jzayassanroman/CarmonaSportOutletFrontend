export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;  // Cambiado a string porque en Angular manejamos el teléfono como string
  direccion: string;
  provincia: string | number; // aquí está el truco
}
