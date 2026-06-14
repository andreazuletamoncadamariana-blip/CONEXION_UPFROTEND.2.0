import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngenieriaAmbienteService {
  private API_URL = 'http://localhost:8080/api/ingenieria-ambiente';

  constructor(private http: HttpClient) { }

  listarProyectos(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  registrarConsulta(datos: any): Observable<any> {
    return this.http.post<any>(this.API_URL, datos);
  }
}
