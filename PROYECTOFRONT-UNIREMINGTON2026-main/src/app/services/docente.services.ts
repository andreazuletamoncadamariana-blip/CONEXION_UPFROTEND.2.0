import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docente } from '../models/docente.model';

@Injectable({ providedIn: 'root' })
export class DocenteService {
  // NOTA: Si accedes desde el celular, cambia localhost por tu IP 192.168.1.54
  private apiUrl = 'http://localhost:8080/api/docentes';

  constructor(private http: HttpClient) {}

  // Renombrado a listarDocentes para coherencia con el Dashboard
  listarDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(this.apiUrl);
  }

  crearDocente(docente: any): Observable<Docente> {
    return this.http.post<Docente>(this.apiUrl, docente);
  }

  actualizarDocente(id: number, docente: any): Observable<Docente> {
    return this.http.put<Docente>(`${this.apiUrl}/${id}`, docente);
  }

  eliminarDocente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
