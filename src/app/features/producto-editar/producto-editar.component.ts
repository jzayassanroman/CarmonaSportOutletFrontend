import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-producto-editar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule,CommonModule],
  templateUrl: './producto-editar.component.html',
  styleUrls: ['./producto-editar.component.css']
})
export class ProductoEditarComponent implements OnInit {
  productForm!: FormGroup;
  productId!: number;
  idCliente!: number;

  // Enums para el formulario (como arrays)
  tipoEnum: string[] = [];
  estadoEnum: string[] = [];

  // Enums definidos dentro del componente
  private Tipo = {
    FITNEES: 'FITNEES',
    FUTBOL: 'FUTBOL',
    BALONCESTO: 'BALONCESTO',
    DEPORTE_DE_CONTACTO: 'DEPORTE_DE_CONTACTO'
  };

  private EstadoProducto = {
    EXCELENTE: 'EXCELENTE',
    BUENO: 'BUENO',
    MALO: 'MALO',
    MUY_MALO: 'MUY_MALO'
  };

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Inicializar arrays desde enums
    this.tipoEnum = Object.values(this.Tipo);
    this.estadoEnum = Object.values(this.EstadoProducto);

    this.route.params.subscribe((params) => {
      this.productId = Number(params['id']);
      if (this.productId) {
        this.loadProduct(this.productId);
      }
    });

    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.idCliente = payload.clienteId;
      } catch (e) {
        console.error('Error al decodificar el token', e);
      }
    }

    this.productForm = this.fb.group({
      nombre: [''],
      tipo: [''],
      descripcion: [''],
      precio: [''],
      imagen1: [''],
      imagen2: [''],
      imagen3: [''],
      imagen4: [''],
      estado: ['']
    });
  }

  loadProduct(id: number): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No se encontró el token');
      return;
    }

    this.productService.getProductById(id, token).subscribe((response: any) => {
      this.productForm.patchValue({
        nombre: response.nombre,
        tipo: response.tipo,
        descripcion: response.descripcion,
        precio: response.precio,
        imagen1: response.imagen1,
        imagen2: response.imagen2,
        imagen3: response.imagen3,
        imagen4: response.imagen4,
        estado: response.estado
      });
    });
  }

  editarProducto(): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No se encontró el token');
      return;
    }

    const formData = {
      ...this.productForm.value,
      idCliente: this.idCliente,
      entrega: 'RECOGIDA'
    };

    this.productService.editarProducto(this.productId, formData, token).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Producto actualizado',
          text: 'Los cambios se han guardado correctamente.',
          confirmButtonColor: '#10b981'
        });
      },
      error: (err) => {
        console.error('Error al editar producto:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: 'Hubo un problema al guardar los cambios.',
          confirmButtonColor: '#ef4444'
        });
      }
    });
  }
}
