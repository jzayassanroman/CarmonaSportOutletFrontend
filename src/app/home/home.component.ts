import { Component } from '@angular/core';
import {ProductCardComponent} from '../features/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
