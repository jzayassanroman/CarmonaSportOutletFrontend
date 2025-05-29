import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Cliente } from '../dto/ClienteDTO';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:8081/clientes/perfil'; // Aquí pondrás la URL de tu backend

  constructor(private http: HttpClient) {}

  updateCliente(cliente: Cliente): Observable<Cliente> {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Cliente>(`${this.apiUrl}/${cliente.id}`, cliente, { headers });
  }

  obtenerPerfil(authToken: string): Observable<Cliente> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.get<Cliente>(`${this.apiUrl}`, { headers });
  }

  editarPerfil(id: number, authToken: string, cliente: Cliente): Observable<Cliente> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente, { headers });
  }

  getClienteById(id: number): Observable<Cliente> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Cliente>(`${this.apiUrl}/cliente/${id}`, { headers });
  }
}
