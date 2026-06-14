import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicioPrestado } from '../models/servicioprestado.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioPrestadoService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:8080/api/servicios-prestados';

  listarTodos(): Observable<ServicioPrestado[]> {
    return this.http.get<ServicioPrestado[]>(this.API_URL);
  }

  crear(servicio: ServicioPrestado): Observable<ServicioPrestado> {
    return this.http.post<ServicioPrestado>(this.API_URL, servicio);
  }

  listarPorBeneficiario(idBeneficiario: number): Observable<ServicioPrestado[]> {
    return this.http.get<ServicioPrestado[]>(`${this.API_URL}/beneficiario/${idBeneficiario}`);
  }

  actualizar(id: number, servicio: ServicioPrestado): Observable<ServicioPrestado> {
    return this.http.put<ServicioPrestado>(`${this.API_URL}/${id}`, servicio);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
