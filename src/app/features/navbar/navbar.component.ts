import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink, CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  showUserDropdown: boolean = false;
  showChatsDropdown: boolean = false; // <- Nuevo
  chats: any[] = [];

  constructor(private router: Router, private chatService: ChatService) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem('authToken');
    this.isLoggedIn = token !== null;

    if (this.isLoggedIn && token) {
      try {
        const usuarioId = this.getUserIdFromToken(token);
        this.chatService.obtenerChatsDelUsuario(usuarioId, token).subscribe((data) => {
          this.chats = data;
          console.log('Chats:', this.chats);
        });
      } catch (error) {
        console.error('Error decoding token:', error);
        this.isLoggedIn = false;
      }
    }
  }

  private getUserIdFromToken(token: string): number {
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    return payload.userId;
  }

  toggleUserDropdown(): void {
    this.showUserDropdown = !this.showUserDropdown;
    this.showChatsDropdown = false;
  }

  toggleChatsDropdown(): void {
    this.showChatsDropdown = !this.showChatsDropdown;
    this.showUserDropdown = false;
  }

  closeDropdown(event: Event): void {
    const target = event.target as HTMLElement;
    if (
      !target.closest('#userMenuButton') &&
      !target.closest('#userDropdown') &&
      !target.closest('#chatsMenuButton') &&
      !target.closest('#chatsDropdown')
    ) {
      this.showUserDropdown = false;
      this.showChatsDropdown = false;
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  protected readonly localStorage = localStorage;
}

