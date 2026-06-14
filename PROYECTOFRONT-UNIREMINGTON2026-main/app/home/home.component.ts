import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  // Título de la sección principal
  public title: string = 'Uniremington Al Parque';

  // Nuevos campos de estadísticas actualizados
  public stats = [
    { label: 'Comunidades Beneficiadas', value: 120, icon: 'fa-solid fa-hand-holding-heart', highlight: false },
    { label: 'Jornadas Realizadas', value: 58, icon: 'fa-solid fa-calendar-check', highlight: false },
    { label: 'Estudiantes Participantes', value: '750+', icon: 'fa-solid fa-user-graduate', highlight: false },
    { label: 'Horas de Voluntariado', value: '2.5k', icon: 'fa-solid fa-clock', highlight: false },
    { label: 'Historias de Éxito', value: '150+', icon: 'fa-solid fa-star', highlight: true }
  ];

  public services = [
    { icon: 'fa-solid fa-paw', title: 'Medicina Veterinaria', description: 'Consultas, vacunación y cuidado animal en campo.' },
    { icon: 'fa-solid fa-gavel', title: 'Asesoría Jurídica', description: 'Acompañamiento legal gratuito para la comunidad.' },
    { icon: 'fa-solid fa-brain', title: 'Psicología', description: 'Atención emocional y psicosocial en el territorio.' },
    { icon: 'fa-solid fa-graduation-cap', title: 'Educación', description: 'Talleres y formación con enfoque social.' },
    { icon: 'fa-solid fa-microscope', title: 'Investigación', description: 'Proyectos de ciencia aplicada para soluciones locales.' },
    { icon: 'fa-solid fa-leaf', title: 'Sostenibilidad', description: 'Promoción de prácticas ambientales y cuidado del entorno.' }
  ];

  public currentStatIndex: number = 0;
  public currentHeroIndex: number = 0;
  public heroSlides = [
    {
      title: 'Atención integral en terreno',
      description: 'Jornadas con servicios profesionales de salud, derecho y bienestar animal para comunidades.',
      cta: 'Ver nuestras jornadas',
      image: 'assets/images/jornadaveterinaria.jpg.jpg',
      eyebrow: 'Jornadas activas'
    },
    {
      title: 'Acompañamiento jurídico gratuito',
      description: 'Consultorios legales que apoyan derechos, trámites y asesoría comunitaria.',
      cta: 'Conoce el equipo',
      image: 'assets/images/consultoriojuridicogratuito.jpg.jpg',
      eyebrow: 'Asesoría social'
    },
    {
      title: 'Impacto real en el territorio',
      description: 'Eventos comunitarios que conectan estudiantes, aliados y familias alrededor de soluciones prácticas.',
      cta: 'Lee los resultados',
      image: 'assets/images/eventocomunitario.jpg.webp',
      eyebrow: 'Comunidades'
    }
  ];
  public currentFeatureIndex: number = 0;
  private statIntervalId: any;
  private heroIntervalId: any;
  private featureIntervalId: any;

  constructor(private router: Router) {}

  /** Open the global Remi chat (AppComponent will listen to this event) */
  openGlobalRemi(): void {
    try {
      window.dispatchEvent(new CustomEvent('openRemiChat'));
    } catch (e) {}
  }

  handleAssistantAction(action: string): void {
    switch (action) {
      case 'inicio':
        this.verHistorias();
        break;
      case 'jornada':
        this.router.navigate(['/solicitar-jornada']);
        break;
      case 'donacion':
        this.router.navigate(['/donar']);
        break;
      case 'game':
        this.router.navigate(['/remi-game']);
        break;
      case 'soporte':
        this.router.navigate(['/contacto']);
        break;
      default:
        break;
    }
  }

  prevHeroSlide(): void {
    this.currentHeroIndex = (this.currentHeroIndex - 1 + this.heroSlides.length) % this.heroSlides.length;
  }

  nextHeroSlide(): void {
    this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroSlides.length;
  }

  goToHeroSlide(index: number): void {
    this.currentHeroIndex = index;
  }

  ngOnInit(): void {
    console.log('HomeComponent inicializado correctamente.');
    // Carrusel automático de estadísticas
    this.statIntervalId = setInterval(() => {
      this.currentStatIndex = (this.currentStatIndex + 1) % this.stats.length;
    }, 3600);

    this.heroIntervalId = setInterval(() => {
      this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroSlides.length;
    }, 5200);

    // Rotación automática de features (badge + claims)
    this.featureIntervalId = setInterval(() => {
      this.currentFeatureIndex = (this.currentFeatureIndex + 1) % 2; // tenemos 2 features principales
    }, 4200);
  }

  ngOnDestroy(): void {
    if (this.statIntervalId) { clearInterval(this.statIntervalId); }
    if (this.heroIntervalId) { clearInterval(this.heroIntervalId); }
    if (this.featureIntervalId) { clearInterval(this.featureIntervalId); }
  }

  /**
   * Maneja la suscripción al boletín informativo (Referencia Imagen 4)
   * @param email El valor capturado desde el input del HTML
   */
  onSubscribe(email: string): void {
    if (email && email.includes('@')) {
      console.log('Suscribiendo el correo:', email);
      alert(`¡Gracias! Hemos registrado el correo: ${email}`);
    } else {
      alert('Por favor, ingresa un correo electrónico válido.');
    }
  }

  contactarEquipo(): void {
    this.router.navigate(['/contacto']);
  }

  accederPlataforma(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Navega a la sección de testimonios o impacto social
   */
  verHistorias(): void {
    this.router.navigate(['/impacto']);
  }
}
