import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ProductoDTO } from '../../dto/ProductoDTO';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  templateUrl: './admin-productos.component.html',
  imports: [
    FormsModule,ReactiveFormsModule,CommonModule
  ],
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {
  productos: ProductoDTO[] = [];
  nuevoProducto: ProductoDTO = {
    nombre: '',
    tipo: '',
    descripcion: '',
    precio: 0,
    imagen1: '',
    entrega: 'DOMICILIO',
    estado: 'DISPONIBLE',
    disponible: true,
    idCliente: 1
  };

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  agregarProducto(): void {
    this.productoService.crearProducto(this.nuevoProducto).subscribe(() => {
      this.cargarProductos();
    });
  }

  editarProducto(producto: ProductoDTO): void {
    this.productoService.editarProducto(producto.id!, producto).subscribe(() => {
      this.cargarProductos();
    });
  }

  eliminarProducto(id: number): void {
    this.productoService.eliminarProducto(id).subscribe(() => {
      this.cargarProductos();
    });
  }
}
