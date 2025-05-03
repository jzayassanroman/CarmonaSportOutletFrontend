import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../dto/ClienteDTO';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8081/clientes/perfil';  // Aquí pondrás la URL de tu backend

  constructor(private http: HttpClient) { }

  // Obtener perfil
  obtenerPerfil(authToken: string): Observable<Cliente> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.get<Cliente>(`${this.apiUrl}`, { headers });
  }

  // Editar perfil
  editarPerfil(id: number, authToken: string, cliente: Cliente): Observable<Cliente> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente, { headers });
  }
}
