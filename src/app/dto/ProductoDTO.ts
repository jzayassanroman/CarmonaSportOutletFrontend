export interface ClienteDTO {
  id: number;
  nombre: string;
}

export interface ProductoDTO {
  id?: number;
  nombre: string;
  tipo: string;
  descripcion: string;
  precio: number;
  imagen1: string;
  imagen2?: string;
  imagen3?: string;
  imagen4?: string;
  entrega: number;
  estado: number;
  disponible: boolean;
  idCliente: number;
  cliente?: ClienteDTO; // Campo opcional
  nombreCliente?: string; // Agregar esta propiedad
}
