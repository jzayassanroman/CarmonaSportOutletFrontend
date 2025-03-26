import { Component, Input } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule],

  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})

export class ProductCardComponent {


  ngOnInit() {
    this.products.forEach(product => {
      product.currentImageIndex = 0;
    });
  }
  products = [
    {
      name: 'Nike Zoom',
      price: 100,
      images: ['url_imagen1.jpg', 'url_imagen2.jpg'],
      currentImageIndex: 0
    },
    {
      name: 'Adidas Superstar',
      price: 80,
      images: ['url_imagen3.jpg', 'url_imagen4.jpg'],
      currentImageIndex: 0
    },

    {
      name: 'Adidas ',
      price: 15,
      images: ['url_imagen5.jpg', 'url_imagen6.jpg'],
      currentImageIndex: 0
    }

];

  nextImage(product: any) {
    product.currentImageIndex = (product.currentImageIndex + 1) % product.images.length;
  }

  prevImage(product: any) {
    product.currentImageIndex = (product.currentImageIndex - 1 + product.images.length) % product.images.length;
  }
}
