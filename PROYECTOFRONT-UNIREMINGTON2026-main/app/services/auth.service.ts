import { Injectable,signal} from '@angular/core';
import{ HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environments';
import {LoginRequest ,Authresponse } from '..core/models/estudiante.model';;



@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiurl = '${environment.apiUrl}/auth';
  
  currentUserRole =signal<string| null>(this.getStoreRole());
  isLoggedIn = signal <boolean>(this.hasToken());
 
 constructor(private http: HttpClient){}

 login(credentials: LoginRequest): Observable<Authresponse> {
    return this.http.post<Authresponse>('${this.apiUrl}/login', credentials)
    .pipe(
      tap(response => this.guardarSesion(response))
    );


    private guardarSesion(response: Authresponse): void {
      localStorage.setItem('token', response.token);
      localStorage.setItem('role',response.role);
      localStorage.setItem('email', response.email);
      
      this.currentUserRole.set(response.email);
      this.isLoggedIn.set(true);
    }
    
    Logout(): void {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');

      this.currentUserRole.set('');
      this.isLoggedIn.set(false);
    }

 getToken(): string | null {
      return localStorage.getItem('token');
 }

 getRole(): string | boolean {
      return !! localStorage.getItem('role');
 }

 private hasToken():boolean {
  return !! localStorage.getItem('token');
 }

 private getStoreRole():string | null {
  return localStorage.getItem('role');
