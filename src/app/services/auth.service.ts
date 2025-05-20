import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject,Observable , tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/auth';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }


  register(user: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, { responseType: 'text' });
  }


  registerClient(clientData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, clientData);
  }
  // Método para verificar el código de verificación
  verifyUserCode(verificationData: { email: string, verificationToken: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify`, verificationData, { responseType: 'text' });
  }

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Aquí guardamos el token en el localStorage
        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token); // guarda el token
          localStorage.setItem('authToken', response.token); // Guarda el token
          this.isAuthenticatedSubject.next(true); // Actualiza el estado de autenticación
        }
      })
    );
  }


  // login(credentials: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
  //     tap((response: any) => {
  //       // Aquí guardamos el token en el localStorage
  //       if (response && response.token) {
  //         localStorage.setItem('authToken', response.token); // Guarda el token
  //       }
  //     })
  //   );
  // }
  obtenerUsuarioLogueado(): any {
    const token = localStorage.getItem('authToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Usuario logueado:', payload);  // Verifica que se esté extrayendo correctamente el usuario
      return payload;
    }
    return null;
  }


  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }


  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Usuario logueado:', payload);
        return payload;
      } catch (e) {
        console.error('Token inválido');
        return null;
      }
    }
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    // Lógica adicional para cerrar sesión
  getUserRole(): string | null {
    const payload = this.obtenerUsuarioLogueado();
    return payload?.rol || null; // Use 'rol' instead of 'role'
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ADMINISTRADOR';
  }

  getUserIdFromToken(): number | null {
    const payload = this.obtenerUsuarioLogueado();
    return payload?.id || payload?.userId || null;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('token');
  // }
  //
  // logout(): void {
  //   localStorage.removeItem('token');
  // }
}
