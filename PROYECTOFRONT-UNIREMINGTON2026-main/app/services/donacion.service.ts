import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonacionService {
  private readonly http = inject(HttpClient);

  // IMPORTANTE: Para que funcione en el celular, cambia 'localhost' por tu IP (ej: 'http://192.168.1.15:8080/api/donaciones')
  // Puedes ver tu IP escribiendo 'ipconfig' en la terminal de Windows.
  private readonly apiUrl = 'http://localhost:8080/api/donaciones';

  registrarDonacion(donacion: any): Observable<any> {
    return this.http.post(this.apiUrl, donacion);
  }

  listarDonaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
