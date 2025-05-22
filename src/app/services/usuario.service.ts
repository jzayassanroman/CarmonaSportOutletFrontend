import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
export interface Usuario {
  id: number;
  username: string;
  rol: string;
  isVerified: boolean;
  estado: number;
}
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8081/user'; // Ajusta si tu backend cambia

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token no encontrado');
      throw new Error('Token no encontrado');
    }
    console.log('Enviando token:', token);  // Verifica que el token se envía correctamente.
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,  // Agrega el token en la cabecera Authorization
    });
  }

  // Método para obtener los usuarios
  obtenerUsuarios(): Observable<Usuario[]> {
    const headers = this.getHeaders();
    return this.http.get<Usuario[]>(`${this.apiUrl}/all`, { headers });
  }


  eliminarUsuario(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`, { headers });
  }
  banearUsuario(id: number): Observable<void> {
    const headers = this.getHeaders(); // Asegúrate de que este método incluya el token de autenticación
    return this.http.put<void>(`${this.apiUrl}/ban/${id}`, {}, { headers });
  }

  desbanearUsuario(id: number): Observable<string> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/desbanear/${id}`, {}, {
      headers,
      responseType: 'text'
    });
  }




}
