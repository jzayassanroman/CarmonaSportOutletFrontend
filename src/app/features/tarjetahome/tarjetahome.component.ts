import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjetahome',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './tarjetahome.component.html',
  styleUrls: ['./tarjetahome.component.css']
})
export class TarjetahomeComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    const token = localStorage.getItem('authToken'); // Obtén el token del localStorage
    if (!token) {
      console.error('No se encontró un token de autenticación.');
      return;
    }

    this.productService.getAllProductos(token).subscribe(
      (response) => {
        this.products = response.map((product) => ({
          id: product.id, // Asegúrate de incluir el ID
          name: product.nombre,
          price: product.precio,
          images: [product.imagen1, product.imagen2, product.imagen3, product.imagen4].filter((img) => img),
          currentImageIndex: 0,
        }));
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }
  nextImage(product: any) {
    product.currentImageIndex = (product.currentImageIndex + 1) % product.images.length;
  }

  prevImage(product: any) {
    product.currentImageIndex = (product.currentImageIndex - 1 + product.images.length) % product.images.length;
  }

  goToProduct(product: any) {
    this.router.navigate(['/productoin'], { queryParams: { id: product.id } });
  }
  toggleFavorite(product: any) {
    const favorites = this.getFavorites();
    const index = favorites.findIndex((fav: any) => fav.id === product.id);

    if (index === -1) {
      favorites.push(product); // Agregar a favoritos
    } else {
      favorites.splice(index, 1); // Eliminar de favoritos
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  isFavorite(product: any): boolean {
    const favorites = this.getFavorites();
    return favorites.some((fav: any) => fav.id === product.id);
  }

  getFavorites(): any[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }
}
