import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoDTO } from '../dto/ProductoDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:8081/productos';

  constructor(private http: HttpClient) {}

  // Método para obtener el token del LocalStorage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Asegúrate de que el token existe
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Obtener todos los productos con el token
  getProductos(): Observable<ProductoDTO[]> {
    return this.http.get<ProductoDTO[]>(`${this.apiUrl}/all`, { headers: this.getAuthHeaders() });
  }
  obtenerProductoPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Crear un producto
  crearProducto(producto: ProductoDTO): Observable<ProductoDTO> {
    return this.http.post<ProductoDTO>(this.apiUrl, producto, { headers: this.getAuthHeaders() });
  }

  // Editar un producto
  editarProducto(id: number, producto: ProductoDTO): Observable<ProductoDTO> {
    return this.http.put<ProductoDTO>(`${this.apiUrl}/editar/${id}`, producto, { headers: this.getAuthHeaders() });
  }

  // Eliminar un producto
  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`, { headers: this.getAuthHeaders() });
  }
}
