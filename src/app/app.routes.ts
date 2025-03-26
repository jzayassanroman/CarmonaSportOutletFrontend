import { Routes } from '@angular/router';
import {NavbarComponent} from './features/navbar/navbar.component';
import {ProductCardComponent} from './features/product-card/product-card.component';
import {NavbarComponent} from './navbar/navbar.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: 'productocard', component:ProductCardComponent },


  {path: '', component: HomeComponent}
];
