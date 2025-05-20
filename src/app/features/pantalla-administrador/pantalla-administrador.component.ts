import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-pantalla-administrador',
  templateUrl: './pantalla-administrador.component.html',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  styleUrls: ['./pantalla-administrador.component.css']
})
export class PantallaAdministradorComponent {
  isLoggedIn: boolean = false;  // Asumimos que el usuario no está logueado
  showDropdown: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();  // Verificar el estado de login cuando se inicializa el componente
  }

  // Método para verificar si el usuario está logueado
  checkLoginStatus(): void {
    const token = localStorage.getItem('authToken');
    this.isLoggedIn = token !== null;
  }
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
    localStorage.removeItem('authToken');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  navigateTo(ruta: string): void {
    this.router.navigate(['/' + ruta]);
  }
}
