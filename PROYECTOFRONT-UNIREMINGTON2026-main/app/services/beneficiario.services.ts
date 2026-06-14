import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beneficiario } from '../models/beneficiario.model';
import { environment } from '../../environments/environments';

/**
 * Servicio para gestionar operaciones CRUD de Beneficiarios
 * Realiza llamadas HTTP al backend para crear, leer, actualizar y eliminar beneficiarios
 */
@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/beneficiarios`;

  /**
   * Obtener lista de todos los beneficiarios
   */
  listar(): Observable<Beneficiario[]> {
    return this.http.get<Beneficiario[]>(this.baseUrl);
  }

  /**
   * Obtener un beneficiario específico por ID
   */
  obtenerPorId(id: number): Observable<Beneficiario> {
    return this.http.get<Beneficiario>(`${this.baseUrl}/${id}`);
  }

  /**
   * Buscar un beneficiario por número de documento
   */
  buscarPorDocumento(documento: string): Observable<Beneficiario> {
    return this.http.get<Beneficiario>(`${this.baseUrl}/documento/${documento}`);
  }

  /**
   * Crear un nuevo beneficiario
   */
  crear(beneficiario: Beneficiario): Observable<Beneficiario> {
    return this.http.post<Beneficiario>(this.baseUrl, beneficiario);
  }

  /**
   * Actualizar un beneficiario existente
   */
  actualizar(id: number, beneficiario: Beneficiario): Observable<Beneficiario> {
    return this.http.put<Beneficiario>(`${this.baseUrl}/${id}`, beneficiario);
  }

  /**
   * Eliminar un beneficiario
   */
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
