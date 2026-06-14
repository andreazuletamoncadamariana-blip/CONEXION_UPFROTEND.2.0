import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsesoriaEmpresarialService {
  private API_URL = 'http://localhost:8080/api/asesorias-empresariales';

  constructor(private http: HttpClient) { }

  getAsesorias(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  crearAsesoria(datos: any): Observable<any> {
    return this.http.post<any>(this.API_URL, datos);
  }
}
