import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent implements OnInit {
  favorites: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.favorites = this.getFavorites();
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

  nextImage(product: any) {
    product.currentImageIndex = (product.currentImageIndex + 1) % product.images.length;
  }

  prevImage(product: any) {
    product.currentImageIndex = (product.currentImageIndex - 1 + product.images.length) % product.images.length;
  }

  goToProduct(product: any) {
    this.router.navigate(['/productoin'], { queryParams: { id: product.id } });
  }
}
