import { Routes } from '@angular/router';
import {RegistroComponent} from './features/registro/registro.component';
import {ProductCardComponent} from './features/product-card/product-card.component';
import {HomeComponent} from './features/home/home.component';
import {RegistroclienteComponent} from './features/registro-cliente/registrocliente/registrocliente.component';
import {VerificacionComponent} from './features/verificacion/verificacion.component';
import {LoginComponent} from './features/login/login.component';
import {LandingComponent} from './features/landing/landing.component';

export const routes: Routes = [
  { path: 'registeruser', component: RegistroComponent },
  { path: 'registerclient', component: RegistroclienteComponent },
  {path: 'verify', component: VerificacionComponent },
  {path: 'login', component: LoginComponent},
  {path: 'productocard', component:ProductCardComponent },
  {path: 'home', component: HomeComponent},
  {path: '', component: LandingComponent},
];
