import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitud-jornada',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitud-jornada.component.html',
  styleUrls: ['./solicitud-jornada.component.scss']
})
export class SolicitudJornadaComponent {

  constructor(private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();

    // Aquí iría la lógica para enviar a un servicio API
    alert('¡Solicitud recibida! El equipo de Proyección Social se comunicará en un plazo de 48 horas.');

    // Redirigir al home después del éxito
    this.router.navigate(['/home']);
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
