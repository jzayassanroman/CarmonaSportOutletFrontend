import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule],

  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})

export class ProductCardComponent implements OnInit {

  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No hay token en localStorage');
      return;
    }

    try {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const idCliente = tokenData.clienteId;

      if (!idCliente) {
        console.error('No se encontró el idCliente en el token');
        return;
      }

      this.productService.getProductsByClientId(idCliente, token).subscribe(
        response => {
          this.products = response.map(product => ({
            name: product.nombre,
            price: product.precio,
            images: [product.imagen1, product.imagen2, product.imagen3, product.imagen4].filter(img => img),
            currentImageIndex: 0
          }));
        },
        error => {
          console.error('Error al cargar los productos:', error);
        }
      );

    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  }

  nextImage(product: any) {
    product.currentImageIndex = (product.currentImageIndex + 1) % product.images.length;
  }

  prevImage(product: any) {
    product.currentImageIndex = (product.currentImageIndex - 1 + product.images.length) % product.images.length;
  }
}
