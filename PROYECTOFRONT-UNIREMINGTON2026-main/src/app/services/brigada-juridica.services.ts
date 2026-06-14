import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrigadaJuridicaService {

  private apiUrl = 'http://localhost:8080/api/servicios-prestados';

  constructor(private http: HttpClient) { }

  // 1. Filtramos por tipo para que el historial solo muestre casos legales
  listarCasos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tipo/Brigada Jurídica`);
  }

  // 2. Al registrar, nos aseguramos de que el backend sepa que es un caso jurídico
  registrarCaso(datos: any): Observable<any> {
    // Si el objeto no trae el tipo, lo asignamos aquí
    if (!datos.tipoServicio) {
      datos.tipoServicio = 'Brigada Jurídica';
    }
    return this.http.post<any>(this.apiUrl, datos);
  }

  eliminarCaso(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
