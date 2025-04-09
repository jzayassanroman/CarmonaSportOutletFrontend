import { Component } from '@angular/core';
import {ProductCardComponent} from '../product-card/product-card.component';
import {NavbarComponent} from '../navbar/navbar.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductCardComponent,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
