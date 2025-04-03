import { Routes } from '@angular/router';
import {NavbarComponent} from './features/navbar/navbar.component';
import {ProductCardComponent} from './features/product-card/product-card.component';
import {HomeComponent} from './home/home.component';
import {RegistroComponent} from './features/registro/registro.component';
import {RegistroclienteComponent} from './features/registro-cliente/registrocliente/registrocliente.component';
import {VerificacionComponent} from './features/verificacion/verificacion.component';
import {LoginComponent} from './features/login/login.component';

export const routes: Routes = [
  { path: 'registeruser', component: RegistroComponent },
  { path: 'registerclient', component: RegistroclienteComponent },
  {path: 'verify', component: VerificacionComponent },
  {path: 'login', component: LoginComponent},
  // { path: '', component: HomeComponent },
  { path: 'productocard', component:ProductCardComponent },


  {path: '', component: HomeComponent}
];
