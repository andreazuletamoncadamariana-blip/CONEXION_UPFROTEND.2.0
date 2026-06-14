import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seguimiento } from '../models/seguimiento.model';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:8080/api/seguimientos';

  getSeguimientos(): Observable<Seguimiento[]> {
    return this.http.get<Seguimiento[]>(this.API_URL);
  }

  getSeguimientosByBeneficiario(idBeneficiario: number): Observable<Seguimiento[]> {
    return this.http.get<Seguimiento[]>(`${this.API_URL}/beneficiario/${idBeneficiario}`);
  }

  crearSeguimiento(seguimiento: Seguimiento): Observable<Seguimiento> {
    return this.http.post<Seguimiento>(this.API_URL, seguimiento);
  }

  eliminarSeguimiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
