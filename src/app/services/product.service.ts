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

  crearProducto(producto: any, token: string): Observable<any> {
    console.log("Enviando producto:", producto);
    const headers = this.getAuthHeaders(token).set('Content-Type', 'application/json');

    return this.http.post<any>('http://localhost:8081/productos', producto, { headers });
  }
}
