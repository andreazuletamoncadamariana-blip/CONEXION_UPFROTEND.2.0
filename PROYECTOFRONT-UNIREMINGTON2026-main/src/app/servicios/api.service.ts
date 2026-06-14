// src/app/servicios/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  // URLs conectadas a tus controladores de Java
  private urlEstudiantes = 'http://localhost:8080/api/estudiantes';
  private urlDocentes = 'http://localhost:8080/api/docentes';

  constructor(private http: HttpClient) {}

  // Métodos para Estudiantes
  getEstudiantes(): Observable<any[]> {
    return this.http.get<any[]>(this.urlEstudiantes);
  }
  registrarEstudiante(datos: any): Observable<any> {
    return this.http.post<any>(this.urlEstudiantes, datos);
  }

  // Métodos para Docentes
  getDocentes(): Observable<any[]> {
    return this.http.get<any[]>(this.urlDocentes);
  }
}
