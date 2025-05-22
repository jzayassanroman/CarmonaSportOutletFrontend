import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
  chatId: number = 0;
  messages: any[] = [];
  newMessage: string = '';
  currentUserId: number = 0;

  constructor(private route: ActivatedRoute, private chatService: ChatService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No se encontró el token de autenticación.');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.currentUserId = payload.userId || payload.id;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return;
    }

    this.route.queryParams.subscribe(params => {
      this.chatId = Number(params['chatId']);
      if (this.chatId) {
        this.loadMessages(token);
      }
    });
  }

  loadMessages(token: string): void {
    this.chatService.getMessagesByChatId(this.chatId, token).subscribe({
      next: (res) => {
        this.messages = res;
      },
      error: (err) => console.error('Error cargando mensajes:', err)
    });
  }


  sendMessage(): void {
    const token = localStorage.getItem('authToken');
    if (!this.newMessage.trim() || !token) return;

    const messageData = {
      chat: { id: this.chatId },
      emisor: { id: this.currentUserId },
      contenido: this.newMessage,
      fechaEnvio: new Date().toISOString() // Agregamos la fecha de envío
    };
    console.log('JSON enviado al backend:', messageData);

    this.chatService.sendMessage(messageData, token).subscribe({
      next: (msg) => {
        this.messages.push(msg);
        this.newMessage = '';
        setTimeout(() => this.scrollToBottom(), 50);
      },
      error: (err) => console.error('Error enviando mensaje:', err)
    });
  }

  scrollToBottom(): void {
    const el = document.getElementById('chat-box');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }
}
