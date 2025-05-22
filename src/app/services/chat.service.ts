import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private baseUrl = 'http://localhost:8081/chats';

  constructor(private http: HttpClient) {}

  checkOrCreateChat(chatData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    console.log('Headers:', headers);
    console.log('Chat data:', chatData);
    return this.http.post(`${this.baseUrl}/crear`, chatData, { headers });
  }

  getMessagesByChatId(chatId: number, token: string): Observable<any[]> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<any[]>(`http://localhost:8081/mensajes/chat/${chatId}`, { headers });
  }
  obtenerChatsDelUsuario(usuarioId: number, token: string): Observable<any[]> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<any[]>(`${this.baseUrl}/usuario/${usuarioId}`, { headers });
  }


  sendMessage(messageData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post(`http://localhost:8081/mensajes/crear`, messageData, { headers });
  }


}
