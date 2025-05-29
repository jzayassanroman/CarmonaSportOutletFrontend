export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  direccion: string;
  telefono: string;
  provincia: string; // Cambiado a string porque en Angular manejamos el teléfono como string
  usuario: {
    id: number;
    username: string;
  };
}
