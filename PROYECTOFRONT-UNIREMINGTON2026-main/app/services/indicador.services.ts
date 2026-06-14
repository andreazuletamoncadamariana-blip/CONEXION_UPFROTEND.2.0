import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Indicador } from '../models/indicador.model';
import { environment } from '../../environments/environments';

/**
 * Servicio para gestionar operaciones CRUD de Indicadores
 * Realiza llamadas HTTP al backend para crear, leer, actualizar y eliminar indicadores
 * También proporciona estadísticas de impacto social
 */
@Injectable({
  providedIn: 'root'
})
export class IndicadorService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/indicadores`;

  /**
   * Obtener lista de todos los indicadores
   */
  getIndicadores(): Observable<Indicador[]> {
    return this.http.get<Indicador[]>(this.apiUrl);
  }

  /**
   * Obtener estadísticas de impacto social
   */
  getEstadisticasImpacto(): Observable<Indicador[]> {
    return this.http.get<Indicador[]>(`${this.apiUrl}/impacto-social`);
  }

  /**
   * Obtener un indicador específico por ID
   */
  getIndicadorById(id: number): Observable<Indicador> {
    return this.http.get<Indicador>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crear un nuevo indicador
   */
  crearIndicador(indicador: Indicador): Observable<Indicador> {
    return this.http.post<Indicador>(this.apiUrl, indicador);
  }

  /**
   * Actualizar un indicador existente
   */
  actualizarIndicador(id: number, indicador: Indicador): Observable<Indicador> {
    return this.http.put<Indicador>(`${this.apiUrl}/${id}`, indicador);
  }

  /**
   * Eliminar un indicador
   */
  eliminarIndicador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
