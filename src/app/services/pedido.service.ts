// src/app/services/pedido.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {HistorialPedidoDTO} from '../dto/HistorialPedidoDTO';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:8081/pedidos';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  crearPedido(pedido: any): Observable<any> {
    const headers = this.getAuthHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.apiUrl}/crear`, pedido, { headers });
  }
  // ✅ Obtener ID del cliente desde el token
  private getIdClienteFromToken(): number | null {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.clienteId ? Number(payload.clienteId) : null; // Cambiado a clienteId
    } catch (e) {
      console.error('Error al decodificar el token:', e);
      return null;
    }
  }

  // ✅ Llamada al backend para obtener el historial
  obtenerHistorialCliente(): Observable<HistorialPedidoDTO[]> {
    const idCliente = this.getIdClienteFromToken();
    const headers = this.getAuthHeaders();

    if (idCliente === null) {
      throw new Error('No se pudo obtener el ID del cliente desde el token.');
    }

    return this.http.get<HistorialPedidoDTO[]>(`${this.apiUrl}/historial/${idCliente}`, {
      headers,
    });
  }
}
