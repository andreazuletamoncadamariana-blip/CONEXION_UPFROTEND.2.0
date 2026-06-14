import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Vital para que el componente pueda inyectarlo
})
export class BienestarAnimalService {

  // Ruta centralizada al controlador genérico de servicios
  private apiUrl = 'http://localhost:8080/api/servicios-prestados';

  constructor(private http: HttpClient) { }

  // Filtra por tipo para obtener solo registros de veterinaria
  listar(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tipo/Bienestar Animal`);
  }

  // Envía el objeto completo para persistir en la tabla maestra
  crear(atencion: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, atencion);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
