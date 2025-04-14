import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-producto-editar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './producto-editar.component.html',
  styleUrls: ['./producto-editar.component.css']
})
export class ProductoEditarComponent implements OnInit {
  productForm!: FormGroup;
  productId!: number;
  idCliente!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = Number(params['id']);
      if (this.productId) {
        this.loadProduct(this.productId);
      }
    });

    // Obtener idCliente desde el token
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
      next: () => alert('Producto actualizado con éxito.'),
      error: (err) => console.error('Error al editar producto:', err)
    });
  }
}
