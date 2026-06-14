import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-solicitud-jornada',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './solicitud-jornada.component.html',
  styleUrls: ['./solicitud-jornada.component.scss']
})
export class SolicitudJornadaComponent {

  formData = {
    entidad: '',
    responsable: '',
    whatsapp: '',
    email: '',
    lugar: 'Parque Principal',
    poblacion: 0,
    servicios: [] as string[],
    infoAdicional: ''
  };

  isEnviando: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  toggleServicio(servicio: string, event: any) {
    if (event.target.checked) {
      this.formData.servicios.push(servicio);
    } else {
      this.formData.servicios = this.formData.servicios.filter(s => s !== servicio);
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.isEnviando = true;

    const payload = {
      ...this.formData,
      servicios: this.formData.servicios.join(', ')
    };

    // La URL debe coincidir exactamente con el @RequestMapping en tu controlador
    this.http.post('http://localhost:8080/api/jornada', payload)
      .subscribe({
        next: () => {
          alert('¡Solicitud recibida!');
          this.router.navigate(['/home']);
        },
        error: (err: any) => {
          console.error('Error al enviar:', err);
          alert('Error al enviar la solicitud.');
          this.isEnviando = false;
        }
      });
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
