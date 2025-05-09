import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../dto/ClienteDTO';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {PedidoService} from '../../services/pedido.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  cliente: Cliente | null = null;
  productName: string = '';
  productPrice: number = 0;
  total: number = 0;
  productId: number = 0; // Asegúrate de que este id sea numérico

  // Tarjeta
  cardNumber: string = '';
  cardName: string = '';
  cardExpiry: string = '';
  cardCVV: string = '';

  focusedField: string = '';

  constructor(private clienteService: ClienteService,     private route: ActivatedRoute,  private pedidoService: PedidoService // <--- añadido aquí
  ) {}

  ngOnInit(): void {
    this.cargarPerfil();
    this.cargarTarjetaGuardada();
    this.route.queryParams.subscribe((params) => {
      this.productName = params['name'];
      this.productPrice = params['price'];
      this.total = this.productPrice; // Asigna el precio al total
      this.productId = params['id']; // Captura el id del producto automáticamente
    });
  }

  cargarPerfil(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.clienteService.obtenerPerfil(token).subscribe({
        next: (data) => {
          this.cliente = data;
        },
        error: (err) => {
          console.error('Error al cargar el perfil del cliente', err);
        }
      });
    }
  }

  cargarTarjetaGuardada(): void {
    const tarjetaGuardada = localStorage.getItem('tarjetaGuardada');
    if (tarjetaGuardada) {
      const tarjeta = JSON.parse(tarjetaGuardada);
      this.cardNumber = tarjeta.cardNumber;
      this.cardName = tarjeta.cardName;
      this.cardExpiry = tarjeta.cardExpiry;
      this.cardCVV = tarjeta.cardCVV;
    }
  }

  simularPago(): void {
    if (!this.cliente) {
      alert('Cliente no disponible');
      return;
    }

    const pedido = {
      cliente: { id: this.cliente.id }, // Incluye el objeto cliente con su id
      producto: { id: this.productId }, // Asegúrate de usar un id numérico
      total: this.total,
      estado: 'PENDIENTE',
      fecha: new Date().toISOString(), // Convierte la fecha al formato ISO
      metodoPago: 'TARJETA'
    };

    this.pedidoService.crearPedido(pedido).subscribe({
      next: () => {
        alert('Pago simulado y pedido guardado con éxito');
      },
      error: (error) => {
        console.error('Error al crear el pedido', error);
        alert('Hubo un error al guardar el pedido');
      }
    });
  }


  get cardNumberDisplay(): string {
    const num = this.cardNumber.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    return num.replace(/(.{4})/g, '$1 ').trim().padEnd(19, '•');
  }

  get cardNameDisplay(): string {
    return this.cardName || 'NOMBRE APELLIDO';
  }

  get cardExpiryDisplay(): string {
    return this.cardExpiry || 'MM/AA';
  }
}
