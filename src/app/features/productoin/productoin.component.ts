import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ValoracionesComponent} from '../valoraciones/valoraciones.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule, RouterLink, ValoracionesComponent],
  templateUrl: './productoin.component.html',
  styleUrls: ['./productoin.component.css']
})
export class ProductoinComponent implements OnInit {
  product: any;
  currentImageIndex: number = 0;
  quantity: number = 1; // Added quantity property
  clienteLogueadoId!: number;


  constructor(private authService:AuthService,private route: ActivatedRoute, private productService: ProductService, private router:Router ) {}

  ngOnInit(): void {
    const id = this.authService.getUserIdFromToken();
    if (id) {
      this.clienteLogueadoId = id;
    }
    this.route.queryParams.subscribe((params) => {
      const productId = Number(params['id']);
      if (productId) {
        this.loadProduct(productId);
      }
    });
  }

  loadProduct(id: number): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No se encontró un token de autenticación.');
      return;
    }

    this.productService.getProductById(id, token).subscribe(
      (response: any) => {
        this.product = {
          id: response.id,
          name: response.nombre,
          category: response.tipo,
          description: response.descripcion,
          price: response.precio,
          clientId: response.idCliente,
          clientName: response.clientName ?? 'Sin cliente', // Cambiado a response.clientName
          images: [response.imagen1, response.imagen2, response.imagen3, response.imagen4].filter((img) => img),
          isFavorite: response.esFavorito
        };
      },
      (error: any) => {
        console.error('Error al cargar el producto:', error);
      }
    );
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  prevImage(): void {
    this.currentImageIndex = this.currentImageIndex > 0
      ? this.currentImageIndex - 1
      : this.product.images.length - 1;
  }

  nextImage(): void {
    this.currentImageIndex = this.currentImageIndex < this.product.images.length - 1
      ? this.currentImageIndex + 1
      : 0;
  }

  setCurrentImage(index: number): void {
    this.currentImageIndex = index;
  }

  toggleFavorite(): void {
    this.product.isFavorite = !this.product.isFavorite;
  }

  addToCart(): void {
    // Aquí puedes implementar la lógica para agregar el producto al carrito
  }
  goToPayment(): void {

    this.router.navigate(['/payment'], {
      queryParams: {
        name: this.product.name,
        id: this.product.id, // <-- añadir esto
        price: this.product.price
      }
    });
  }
}
