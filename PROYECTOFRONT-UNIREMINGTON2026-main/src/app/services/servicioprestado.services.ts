import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioPrestadoService {
  private API_URL = 'http://localhost:8080/api/servicios';

  constructor(private http: HttpClient) { }

  // Método para obtener todos los registros
  listar(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  // Método para crear uno nuevo
  crear(datos: any): Observable<any> {
    return this.http.post(this.API_URL, datos);
  }

  // Método para actualizar un registro existente
  actualizar(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, datos);
  }

  // Método para eliminar un registro
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
