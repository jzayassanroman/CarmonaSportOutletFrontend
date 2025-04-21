import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8081/productos/cliente';

  constructor(private http: HttpClient) {}
  @Output() productoCreado = new EventEmitter<any>();

  private getAuthHeaders(token: string): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  getAllProductos(token: string): Observable<any[]> {
    const headers = this.getAuthHeaders(token);
    return this.http.get<any[]>('http://localhost:8081/productos/all', { headers });
  }

  getProductById(productId: number, token: string): Observable<any> {
    const headers = this.getAuthHeaders(token);
    return this.http.get<any>(`http://localhost:8081/productos/${productId}`, { headers });
  }

  getProductsByClientId(clientId: number, token: string): Observable<any[]> {
    const headers = this.getAuthHeaders(token);

    return this.http.get<any[]>(`${this.apiUrl}/${clientId}`, { headers });
  }
  eliminarProducto(productId: number, token: string): Observable<void> {
    const headers = this.getAuthHeaders(token);
    return this.http.delete<void>(`http://localhost:8081/productos/eliminar/${productId}`, { headers });
  }
  editarProducto(id: number, producto: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`http://localhost:8081/productos/editar/${id}`, producto, { headers });
  }

  crearProducto(producto: any, token: string): Observable<any> {
    console.log("Enviando producto:", producto);
    const headers = this.getAuthHeaders(token).set('Content-Type', 'application/json');

    return this.http.post<any>('http://localhost:8081/productos', producto, { headers });
  }
}
