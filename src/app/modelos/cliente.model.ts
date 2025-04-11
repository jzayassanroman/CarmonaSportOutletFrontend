export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  direccion?: string;
  telefono: string;
  usuario: {
    id: number;
    username: string;
  };
}
