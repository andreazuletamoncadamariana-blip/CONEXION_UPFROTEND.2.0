import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Cambia esta URL por la de tu API real
  private apiUrl = 'https://api.tu-servidor.com/auth';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    // Simulación de login para pruebas
    console.log('Intentando login con:', credentials);
    return of({ success: true, token: 'fake-jwt-token' });
    // Real: return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  sendResetPasswordEmail(email: string): Observable<any> {
    console.log('Enviando recuperación a:', email);
    return of({ success: true });
    // Real: return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }
}
