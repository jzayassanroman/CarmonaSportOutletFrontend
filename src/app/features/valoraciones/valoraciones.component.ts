import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValoracionesService } from '../../services/valoraciones.service';
import { AuthService } from '../../services/auth.service';
import { ProductoService } from '../../services/producto.service';
import { FormsModule } from '@angular/forms';
import {DatePipe, NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-valoracion',
  templateUrl: './valoraciones.component.html',
  standalone: true,
  imports: [FormsModule, DatePipe, NgForOf, NgIf, NgClass, NgSwitch, NgSwitchCase, NgSwitchDefault],
  styleUrls: ['./valoraciones.component.css']
})
export class ValoracionesComponent implements OnInit {
  producto: any;
  valoracion = {
    valoracion: '',
    estrellas: 5
  };
  valoracionesProducto: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private valoracionService: ValoracionesService,
    private productoService: ProductoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const productoId = Number(params['id']);
      if (!productoId) {
        alert('ID de producto inválido');
        return;
      }

      this.productoService.obtenerProductoPorId(productoId).subscribe({
        next: (productoData) => {
          this.producto = productoData;

          if (!this.producto?.id) {
            alert('El producto no tiene ID');
            return;
          }

          this.cargarValoracionesProducto(this.producto.id);
        },
        error: (err) => {
          console.error('Error al obtener producto:', err);
          alert('No se pudo cargar el producto');
        }
      });
    });
  }

  enviarValoracion(): void {
    const clienteId = this.authService.getUserIdFromToken();
    if (!clienteId || !this.producto) {
      alert('Faltan datos para enviar la valoración');
      return;
    }

    const nuevaValoracion = {
      idCliente: clienteId,
      idClienteValorado: this.producto.idCliente, // Sigue siendo necesario para saber a quién se valora
      idProducto: this.producto.id,
      valoracion: this.valoracion.valoracion,
      estrellas: this.valoracion.estrellas
    };

    this.valoracionService.crearValoracion(nuevaValoracion).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Valoración enviada',
          text: 'Gracias por tu valoración.'
        }).then(() => {
          // Recargar valoraciones del producto
          this.cargarValoracionesProducto(this.producto.id);
          this.valoracion.valoracion = '';
          this.valoracion.estrellas = 5;
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar valoración',
          text: 'Por favor, inténtalo de nuevo más tarde.'
        })
      }
    });

  }

  cargarValoracionesProducto(productoId: number): void {
    this.valoracionService.obtenerValoracionesDeProducto(productoId).subscribe({
      next: (data) => (this.valoracionesProducto = data),
      error: (err) => console.error('Error al cargar valoraciones del producto:', err)
    });
  }

  setEstrellas(valor: number) {
    this.valoracion.estrellas = valor;
  }

  onEstrellaChange(valor: number) {
    // Este método se ejecuta cuando cambia el input number (si decides usarlo)
  }

  getStarClass(starNumber: number): string {
    const currentStars = this.valoracion.estrellas || 0;
    if (starNumber <= currentStars) {
      return 'text-yellow-400 hover:text-yellow-500';
    } else {
      return 'text-gray-300 hover:text-yellow-200';
    }
  }
  getValoracionesOrdenadas() {
    return [...this.valoracionesProducto].sort((a, b) =>
      new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    );
  }
}
