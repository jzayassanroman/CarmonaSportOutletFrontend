import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from './features/navbar/navbar.component';
import {FooterComponent} from './features/footer/footer.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  isAdminRoute: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      // Verifica si la ruta actual contiene "admin"
      this.isAdminRoute = this.router.url.includes('/admin-productos');
    });
  }
}
