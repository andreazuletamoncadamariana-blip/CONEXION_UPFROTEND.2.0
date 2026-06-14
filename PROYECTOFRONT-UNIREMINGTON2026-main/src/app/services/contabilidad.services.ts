import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ContabilidadService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/contabilidad`;

  getRegistros(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerBalance(periodo: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/balance/${periodo}`);
  }

  crearAsiento(asiento: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, asiento);
  }

  eliminarRegistro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
