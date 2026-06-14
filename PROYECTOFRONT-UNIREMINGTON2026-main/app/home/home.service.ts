import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Datos para las estadísticas (podrían venir de una API en el futuro)
  stats = [
    { label: 'Años de Historia', value: 110, icon: 'fas fa-history' },
    { label: 'Sedes Nacionales', value: 28, icon: 'fas fa-map-marker-alt' },
    { label: 'Facultades Activas', value: 7, icon: 'fas fa-university' },
    { label: 'Impacto Social', value: '15k+', icon: 'fas fa-heart', highlight: true }
  ];

  constructor() {}

  ngOnInit(): void {
    // Aquí podrías inicializar animaciones de scroll si las usas
    console.log('Home Component cargado correctamente');
  }

  /**
   * Método para el botón principal de solicitud
   */
  solicitarJornada(): void {
    console.log('Redirigiendo a formulario de solicitud...');
    // Aquí podrías usar el Router para navegar: this.router.navigate(['/solicitud']);
    alert('Función para solicitar jornada: Próximamente disponible.');
  }

  /**
   * Lógica para el banner de suscripción (Newsletter)
   */
  onSubscribe(): void {
    // En una app real, aquí capturarías el valor del input
    alert('¡Gracias por tu interés! Te avisaremos cuando estemos cerca de tu ubicación.');
  }

}
