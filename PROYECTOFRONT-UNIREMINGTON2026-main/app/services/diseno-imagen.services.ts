import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DisenoImagenService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/diseno-imagen`;

  getProyectos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  solicitarDiseno(propuesta: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, propuesta);
  }

  actualizarEstado(id: number, estado: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/estado`, { estado });
  }

  eliminarProyecto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
