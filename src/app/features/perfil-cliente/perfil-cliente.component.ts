import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../dto/ClienteDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {

  cliente: Cliente | null = null;
  provincias: string[] = ['ALMERIA', 'CADIZ', 'CORDOBA', 'GRANADA', 'HUELVA', 'JAEN', 'MALAGA', 'SEVILLA'];
  selectedProvincia: string = '';

  // Tarjeta de crédito
  cardNumber: string = '';
  cardName: string = '';
  cardExpiry: string = '';
  cardCVV: string = '';
  guardarTarjeta: boolean = false;
  isCardFlipped: boolean = false;

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.obtenerPerfil();

    // Cargar tarjeta guardada si existe
    const savedCard = localStorage.getItem('tarjetaGuardada');
    if (savedCard) {
      const tarjeta = JSON.parse(savedCard);
      this.cardNumber = tarjeta.cardNumber;
      this.cardName = tarjeta.cardName;
      this.cardExpiry = tarjeta.cardExpiry;
      this.cardCVV = tarjeta.cardCVV;
      this.guardarTarjeta = true;
    }
  }

  obtenerPerfil() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.clienteService.obtenerPerfil(token).subscribe({
        next: (data) => {
          this.cliente = data;
          console.log('Perfil del cliente recibido:', this.cliente);
          console.log('ID del cliente:', this.cliente?.id);
          if (!this.cliente?.id) {
            console.error('El ID del cliente no está definido');
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error obteniendo perfil', error);
        }
      });
    } else {
      console.error('Token no encontrado en localStorage');
    }
  }

  guardarEdicion() {
    if (this.cliente) {
      const token = localStorage.getItem('authToken');
      if (token) {
        if (!this.cliente.id) {
          console.error('El ID del cliente no está definido. No se puede guardar la edición.');
          return;
        }

        const provinciaNombre = String(this.cliente.provincia);
        const provinciaIndex = this.provincias.indexOf(provinciaNombre);

        if (provinciaIndex !== -1) {
          this.cliente.provincia = provinciaIndex as any;
        }

        this.clienteService.editarPerfil(this.cliente.id, token, this.cliente).subscribe({
          next: (data) => {
            console.log('Perfil actualizado', data);
            // Guardar tarjeta si está seleccionado
            if (this.guardarTarjeta) {
              const tarjetaInfo = {
                cardNumber: this.cardNumber,
                cardName: this.cardName,
                cardExpiry: this.cardExpiry,
                cardCVV: this.cardCVV
              };
              localStorage.setItem('tarjetaGuardada', JSON.stringify(tarjetaInfo));
            } else {
              localStorage.removeItem('tarjetaGuardada');
            }

            window.location.reload();
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error editando perfil', error);
          }
        });
      } else {
        console.error('Token no encontrado en localStorage');
      }
    }
  }

  get cardNumberDisplay(): string {
    const num = this.cardNumber.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const formatted = num.replace(/(.{4})/g, '$1 ').trim();
    return formatted.padEnd(19, '•');
  }

}
