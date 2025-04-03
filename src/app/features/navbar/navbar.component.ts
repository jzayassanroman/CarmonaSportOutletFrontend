import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  toNavigateToHome() {
    window.location.href = '';
  }
  toNavigateToLogin() {
    window.location.href = '/login';
  }


}
