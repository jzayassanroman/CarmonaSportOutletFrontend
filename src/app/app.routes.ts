import { Routes } from '@angular/router';
import {RegistroComponent} from './features/registro/registro.component';
import {RegistroclienteComponent} from './features/registro-cliente/registrocliente/registrocliente.component';
import {VerificacionComponent} from './features/verificacion/verificacion.component';
import {LoginComponent} from './features/login/login.component';
import {ProductCardComponent} from './features/product-card/product-card.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [

  { path: 'productocard', component:ProductCardComponent },
  {path: '', component: HomeComponent},
  { path: 'registeruser', component: RegistroComponent },
  { path: 'registerclient', component: RegistroclienteComponent },
  {path: 'verify', component: VerificacionComponent },
  {path: 'login', component: LoginComponent},
];
