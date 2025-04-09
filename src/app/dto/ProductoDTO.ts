export interface ProductoDTO {
  id?: number; // Opcional porque en la creación no lo tendremos
  nombre: string;
  tipo: string;
  descripcion: string;
  precio: number;
  imagen1: string;
  imagen2?: string;
  imagen3?: string;
  imagen4?: string;
  entrega: 'DOMICILIO' | 'TIENDA';
  estado: 'DISPONIBLE' | 'NO_DISPONIBLE';
  disponible: boolean;
  idCliente: number;
}
