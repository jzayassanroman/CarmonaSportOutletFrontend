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
  entrega: number; // 0 = RECOGIDA, 1 = ENVIO_DOMICILIO
  estado: number;  // 0 = CANCELADO, 1 = EN_CURSO, 2 = ENVIADO, 3 = ENTREGADO
  disponible: boolean;
  idCliente: number;
}
