import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EstudiantePayload {
  id?: number;
  nombre: string;
  email: string;
  documento: string;
  facultad: string;
  password?: string;
  activo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private apiUrl = 'http://localhost:8080/api/estudiantes';

  constructor(private http: HttpClient) {}

  listarEstudiantes(): Observable<EstudiantePayload[]> {
    return this.http.get<EstudiantePayload[]>(this.apiUrl);
  }

  crearEstudiante(estudiante: EstudiantePayload): Observable<EstudiantePayload> {
    return this.http.post<EstudiantePayload>(this.apiUrl, estudiante);
  }

  actualizarEstudiante(id: number, estudiante: EstudiantePayload): Observable<EstudiantePayload> {
    return this.http.put<EstudiantePayload>(`${this.apiUrl}/${id}`, estudiante);
  }

  eliminarEstudiante(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
