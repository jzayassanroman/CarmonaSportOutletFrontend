import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/auth';
  private tokenKey = 'authToken';
  private authStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  authStatus$ = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  register(user: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, { responseType: 'text' });
  }

  registerClient(clientData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, clientData);
  }

  verifyUserCode(verificationData: { email: string; verificationToken: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify`, verificationData, { responseType: 'text' });
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          this.authStatusSubject.next(true); // 🔥 Notifica que se ha logueado
        }
      })
    );
  }



  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.authStatusSubject.next(false); // 🔥 Notifica que se ha deslogueado
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  obtenerUsuarioLogueado(): any {
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
    return null;
  }

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
}
