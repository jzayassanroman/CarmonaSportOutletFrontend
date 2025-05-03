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
  provincias: string[] = ['ALMERIA', 'CADIZ', 'CORDOBA', 'GRANADA', 'HUELVA', 'JAEN', 'MALAGA', 'SEVILLA']; // Provincias directamente en frontend
  selectedProvincia: string = ''; // Provincia seleccionada

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.obtenerPerfil();
  }

  obtenerPerfil() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.clienteService.obtenerPerfil(token).subscribe({
        next: (data) => {
          this.cliente = data;
          console.log('Perfil del cliente recibido:', this.cliente);
          console.log('ID del cliente:', this.cliente?.id); // Verifica que el ID esté presente
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
            // Recargar la página para reflejar los cambios
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



}
