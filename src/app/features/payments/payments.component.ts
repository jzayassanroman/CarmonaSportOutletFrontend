import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../dto/ClienteDTO';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

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

  // Tarjeta
  cardNumber: string = '';
  cardName: string = '';
  cardExpiry: string = '';
  cardCVV: string = '';

  focusedField: string = '';

  constructor(private clienteService: ClienteService,     private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.cargarPerfil();
    this.cargarTarjetaGuardada();
    this.route.queryParams.subscribe((params) => {
      this.productName = params['name'];
      this.productPrice = params['price'];
      this.total = this.productPrice; // Asigna el precio al total

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
    console.log('Pagando con tarjeta:', {
      cliente: this.cliente,
      tarjeta: {
        number: this.cardNumber,
        name: this.cardName,
        expiry: this.cardExpiry,
        cvv: this.cardCVV
      }
    });
    alert('Pago simulado con éxito');
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
