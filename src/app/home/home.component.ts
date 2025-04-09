import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProductCardComponent } from '../features/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/products.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  mostrarFormulario = false;
  idCliente: number | null = null;


  producto = {
    nombre: '',
    tipo: '',
    descripcion: '',
    precio: null,
    imagen1: '',
    imagen2: '',
    imagen3: '',
    imagen4: '',
    entrega: 'RECOGIDA',
    estado: '',
    disponible: true,
    idCliente: null,
  };

  tipos = ['FITNEES', 'FUTBOL', 'BALONCESTO', 'DEPORTE_DE_CONTACTO'];
  estados = ['EXCELENTE', 'BUENO', 'MALO', 'MUY_MALO'];

  constructor(private productService: ProductService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.actualizarEstadoLogin();
      }
    });
  }

  ngOnInit() {
    this.actualizarEstadoLogin();
    this.obtenerIdCliente();
  }

  actualizarEstadoLogin() {
    const token = localStorage.getItem('authToken');
    console.log('[TOKEN DETECTADO]', token);
    this.isLoggedIn = !!token;
    console.log('[ESTADO LOGIN]', this.isLoggedIn);
  }


  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  obtenerIdCliente() {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.warn('Token no encontrado en localStorage.');
      return;
    }

    try {
      // Partimos el token en sus tres partes: header.payload.signature
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);

      const idCliente = payload.clienteId;

      if (!idCliente) {
        console.warn('clienteId no encontrado en el token.');
        return;
      }

      console.log('idCliente:', idCliente);

      // Asigna el idCliente al producto
      this.producto.idCliente = idCliente;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  }



  crearProducto() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No se encontró un token en localStorage.');
      return;
    }

    if (!this.producto.idCliente) {
      console.error('idCliente es nulo.');
      return;
    }

    this.productService.crearProducto(this.producto, token).subscribe({
      next: (response) => {
        console.log('Producto creado exitosamente:', response);
        this.limpiarFormulario();
        this.cerrarFormulario();
      },
      error: (error) => {
        console.error('Error al crear el producto:', error);
      }
    });
  }

  limpiarFormulario() {
    this.producto = {
      nombre: '',
      tipo: '',
      descripcion: '',
      precio: null,
      imagen1: '',
      imagen2: '',
      imagen3: '',
      imagen4: '',
      entrega: 'RECOGIDA',
      estado: '',
      disponible: true,
      idCliente: this.producto.idCliente,
    };
  }
}
