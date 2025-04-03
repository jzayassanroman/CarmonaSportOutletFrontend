import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8081/productos/cliente';

  constructor(private http: HttpClient) {}

  getProductsByClientId(clientId: number, token: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Agregamos el token en los headers
    });

    return this.http.get<any[]>(`${this.apiUrl}/${clientId}`, { headers });
  }
}
