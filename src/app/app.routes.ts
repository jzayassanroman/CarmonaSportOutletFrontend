import { Routes } from '@angular/router';
import {ProductCardComponent} from './features/product-card/product-card.component';
import {HomeComponent} from './features/home/home.component';
import {RegistroComponent} from './features/registro/registro.component';
import {RegistroclienteComponent} from './features/registro-cliente/registrocliente/registrocliente.component';
import {VerificacionComponent} from './features/verificacion/verificacion.component';
import {LoginComponent} from './features/login/login.component';
import {LandingComponent} from './features/landing/landing.component';
import {ProductoInComponent} from './features/producto-in/producto-in.component';
import {EditarClienteComponent} from './features/editar-cliente/editar-cliente.component';
import {AdminProductosComponent} from './features/admin-productos/admin-productos.component';
import {ProductoinComponent} from './features/productoin/productoin.component';
import {AdminUserComponent} from './features/admin-user/admin-user.component';

export const routes: Routes = [
  { path: 'registeruser', component: RegistroComponent },
  { path: 'registerclient', component: RegistroclienteComponent },
  {path: 'verify', component: VerificacionComponent },
  {path: 'login', component: LoginComponent},
  {path: 'productocard', component:ProductCardComponent },
  {path: 'home', component: HomeComponent},
  {path: '', component: LandingComponent},
  {path: 'admin-productos', component: AdminProductosComponent },
  { path: 'productoin', component: ProductoinComponent },
  {path:'admin-user', component: AdminUserComponent},

  {path:'editar-cliente', component:EditarClienteComponent },
];
