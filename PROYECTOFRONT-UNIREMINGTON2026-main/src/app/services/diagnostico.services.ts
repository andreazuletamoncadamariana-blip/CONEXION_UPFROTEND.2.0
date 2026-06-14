import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Diagnostico } from '../models/diagnostico.model';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/diagnosticos`;

  getDiagnosticos(): Observable<Diagnostico[]> {
    return this.http.get<Diagnostico[]>(this.apiUrl);
  }

  crearDiagnostico(diagnostico: Diagnostico): Observable<Diagnostico> {
    return this.http.post<Diagnostico>(this.apiUrl, diagnostico);
  }

  eliminarDiagnostico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
