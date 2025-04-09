import {EventEmitter, Injectable, Output} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8081/productos/cliente';

  constructor(private http: HttpClient) {}
  @Output() productoCreado = new EventEmitter<any>();

  getProductsByClientId(clientId: number, token: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Agregamos el token en los headers
    });

    return this.http.get<any[]>(`${this.apiUrl}/${clientId}`, { headers });
  }

  crearProducto(producto: any, token: string): Observable<any> {
    console.log("Enviando producto:", producto); // 👈 Agrega este console.log
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>('http://localhost:8081/productos', producto, { headers });
  }



}
