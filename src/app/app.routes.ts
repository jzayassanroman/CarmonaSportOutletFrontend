import { Routes } from '@angular/router';
import { NavbarComponent } from './features/navbar/navbar.component';
import { ProductCardComponent } from './features/product-card/product-card.component';
import { HomeComponent } from './features/home/home.component';
import { RegistroComponent } from './features/registro/registro.component';
import { RegistroclienteComponent } from './features/registro-cliente/registrocliente/registrocliente.component';
import { VerificacionComponent } from './features/verificacion/verificacion.component';
import { LoginComponent } from './features/login/login.component';
import { LandingComponent } from './features/landing/landing.component';
import { AdminProductosComponent } from './features/admin-productos/admin-productos.component';
import { ProductoinComponent } from './features/productoin/productoin.component';
import { AdminUserComponent } from './features/admin-user/admin-user.component';
import { ProductoEditarComponent } from './features/producto-editar/producto-editar.component';
import { PaymentComponent } from './features/payment/payment.component';
import { EditarClienteComponent } from './features/editar-cliente/editar-cliente.component';
import { PantallaAdministradorComponent } from './features/pantalla-administrador/pantalla-administrador.component';
import { AdminGuard } from './services/admin.guard'; // 👈 Añadido
import {PerfilClienteComponent} from './features/perfil-cliente/perfil-cliente.component';
import {HistorialPedidosComponent} from './features/historial-pedido/historial-pedido.component';
import {FavoritosComponent} from './features/favoritos/favoritos.component';


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
  { path: 'producto-editar/:id', component: ProductoEditarComponent },
  { path: 'perfil', component: PerfilClienteComponent },
  { path: 'payment', component: PaymentComponent },
  {path:'admin-user', component: AdminUserComponent},
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'historial', component: HistorialPedidosComponent },

  { path: 'admin-user', component: AdminUserComponent, canActivate: [AdminGuard] }, // 👈 Protegido
  { path: 'pantalla-administrador', component: PantallaAdministradorComponent, canActivate: [AdminGuard] }, // 👈 Protegido
  { path: 'editar-cliente', component: EditarClienteComponent },
];
