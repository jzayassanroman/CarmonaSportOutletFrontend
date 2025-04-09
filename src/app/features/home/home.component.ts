import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

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
    entrega: 1,
    estado: 2,
    disponible: true,
    idCliente: null,
  };

  tipos = ['FITNEES', 'FUTBOL', 'BALONCESTO', 'DEPORTE_DE_CONTACTO'];

  estados = [
    { label: 'EXCELENTE', value: 0 },
    { label: 'BUENO', value: 1 },
    { label: 'MALO', value: 2 },
    { label: 'MUY_MALO', value: 3 }
  ];

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
    this.isLoggedIn = !!token;
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  obtenerIdCliente() {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      const idCliente = payload.clienteId;

      if (!idCliente) return;

      this.producto.idCliente = idCliente;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  }

  crearProducto() {
    const token = localStorage.getItem('authToken');
    if (!token || !this.producto.idCliente) return;

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
      entrega: 1,
      estado: 1,
      disponible: true,
      idCliente: this.producto.idCliente,
    };
  }
}
