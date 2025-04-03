import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn: boolean = true; // Simula autenticación, cámbialo según tu lógica real
  showDropdown: boolean = false;

  constructor(private router: Router) {}

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('#userMenuButton') && !target.closest('#userDropdown')) {
      this.showDropdown = false;
    }
  }

  logout(): void {
    alert('Cerrando sesión...');
    this.isLoggedIn = false;
    this.router.navigate(['/login']); // Redirige a la página de login tras cerrar sesión
  }

}
