import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ProductoDTO } from '../../dto/ProductoDTO';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  templateUrl: './admin-productos.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {
  productos: ProductoDTO[] = [];
  modalCrearVisible: boolean = false;

  entregas = [
    { label: 'RECOGIDA', value: 0 },
    { label: 'ENVIO_DOMICILIO', value: 1 }
  ];

  estados = [
    { label: 'CANCELADO', value: 0 },
    { label: 'EN_CURSO', value: 1 },
    { label: 'ENVIADO', value: 2 },
    { label: 'ENTREGADO', value: 3 }
  ];

  nuevoProducto: ProductoDTO = {
    nombre: '',
    tipo: '',
    descripcion: '',
    precio: 0,
    imagen1: '',
    entrega: 0,
    estado: 1,
    disponible: true,
    idCliente: 1
  };

  productoEnEdicion: ProductoDTO | null = null;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data; // Asignar directamente los datos del backend
    });
  }

  mostrarModalCrear(): void {
    this.resetForm();
    this.modalCrearVisible = true;
  }

  cerrarModalCrear(): void {
    this.modalCrearVisible = false;
  }

  agregarProducto(): void {
    this.productoService.crearProducto(this.nuevoProducto).subscribe(() => {
      this.cargarProductos();
      this.cerrarModalCrear();
    });
  }

  iniciarEdicion(producto: ProductoDTO): void {
    this.productoEnEdicion = { ...producto }; // Copia para edición
  }

  guardarEdicion(): void {
    if (this.productoEnEdicion && this.productoEnEdicion.id) {
      this.productoService.editarProducto(this.productoEnEdicion.id, this.productoEnEdicion).subscribe(() => {
        this.cargarProductos();
        this.productoEnEdicion = null;
      });
    }
  }

  cancelarEdicion(): void {
    this.productoEnEdicion = null;
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe(() => {
        this.cargarProductos();
      });
    }
  }

  resetForm(): void {
    this.nuevoProducto = {
      nombre: '',
      tipo: '',
      descripcion: '',
      precio: 0,
      imagen1: '',
      entrega: 0,
      estado: 1,
      disponible: true,
      idCliente: 1
    };
  }

  obtenerNombreEstado(estado: number): string {
    const estadoEncontrado = this.estados.find(e => e.value === estado);
    return estadoEncontrado ? estadoEncontrado.label : 'Desconocido';
  }
}
