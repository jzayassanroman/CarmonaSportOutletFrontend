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
  products = [
    { name: 'Cinta de correr', price: 350, image: 'assets/treadmill.jpg' },
    { name: 'Nike Zoom', price: 100, image: 'assets/nike-zoom.jpg' },
    { name: 'Pala de pádel', price: 350, image: 'assets/padel.jpg' },
  ];
}
