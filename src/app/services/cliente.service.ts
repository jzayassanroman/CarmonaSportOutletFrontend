import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Cliente } from '../modelos/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8081/auth/clientes';

  constructor(private http: HttpClient) {}

  updateCliente(cliente: Cliente): Observable<Cliente> {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<Cliente>(`${this.apiUrl}/${cliente.id}`, cliente, { headers })
  }


  getClienteById(id: number): Observable<Cliente> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Cliente>(`${this.apiUrl}/cliente/${id}`, { headers })

  }


}
