import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaludService {
  private API_URL = 'http://localhost:8080/api/salud';

  constructor(private http: HttpClient) { }

  listarAtenciones(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  guardarAtencion(atencion: any): Observable<any> {
    return this.http.post<any>(this.API_URL, atencion);
  }
}
