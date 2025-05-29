import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValoracionesService {
  private apiUrl = 'http://localhost:8081/valoraciones';

  constructor(private http: HttpClient, private authService: AuthService) {}

  crearValoracion(valoracion: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    // Use getUserIdFromToken to extract the client ID
    const clienteId = this.authService.getUserIdFromToken2();
    if (!clienteId) {
      throw new Error('ID del cliente no encontrado en el token');
    }

    // Add the client ID to the valoracion object
    valoracion.idCliente = clienteId;


    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/crear`, valoracion, { headers });
  }

  obtenerValoracionesDeProducto(productoId: number): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.get<any[]>(`${this.apiUrl}/producto/${productoId}`, { headers });
  }


}
