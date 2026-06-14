import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

interface UsuarioLogin {
  nombre?: string;
  apellido?: string;
  email?: string;
  // correo?: string; // Eliminado, 'email' es el campo estándar
  documento?: string;
  facultad?: string;
  especialidad?: string;
  password?: string;
  activo?: boolean;
  id?: number;
  role?: string;
}

export interface Estudiante {
  id?: number;
  nombre: string;
  email: string;
  facultad: string;
  password?: string;
  fechaRegistro?: string;
}

interface JornadaRequest {
  id?: number;
  nombreSolicitante: string;
  emailSolicitante: string;
  telefonoSolicitante?: string;
  municipio: string;
  comunidad: string;
  descripcionNecesidad: string;
  fechaSolicitud?: string; // Formato YYYY-MM-DD
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; pass: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, {
      email: credentials.email,
      password: credentials.pass
    });
  }

  // =====================
  // ESTUDIANTES (Usuarios)
  // =====================
  getStudents(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/admin/students`);
  }

  createStudent(student: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(`${this.apiUrl}/admin/students`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/students/${id}`);
  }

  // =====================
  // DOCENTES  ✅ CORREGIDO
  // =====================
  getTeachers(): Observable<UsuarioLogin[]> {
    return this.http.get<UsuarioLogin[]>(`${this.apiUrl}/docentes`);
  }

  createTeacher(teacher: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>(`${this.apiUrl}/docentes`, teacher);
  }

  updateTeacher(id: number, teacher: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.put<UsuarioLogin>(`${this.apiUrl}/docentes/${id}`, teacher);
  }

  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/docentes/${id}`);
  }

  // =====================
  // DONACIONES
  // =====================
  registrarDonacion(donacionData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/donaciones`, donacionData);
  }

  // =====================
  // SOLICITUD DE JORNADA
  // =====================
  createJornadaRequest(jornada: JornadaRequest): Observable<JornadaRequest> {
    return this.http.post<JornadaRequest>(`${this.apiUrl}/jornadas`, jornada);
  }
}
