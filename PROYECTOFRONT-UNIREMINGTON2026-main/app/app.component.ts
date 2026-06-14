import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { DonacionComponent } from './components/donacion/donacion.component';

type RemiAction = 'home' | 'login' | 'jornada' | 'donacion' | 'game' | 'soporte' | 'dashboard' | 'blog';

interface RemiResponse {
  title: string;
  message: string;
  steps: string[];
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, DonacionComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Uniremington al Parque - Proyección Social';

  // Variables para el asistente "Remi"
  isChatOpen: boolean = false;
  showWelcome: boolean = false;
  showDonacion: boolean = false;
  // Mobile menu state for header
  mobileMenuOpen: boolean = false;
  remiResponse: RemiResponse = {
    title: 'Hola, soy Remi',
    message: 'Estoy aqui para orientarte dentro de Uniremington Al Parque. Elige una opcion y te guio paso a paso.',
    steps: [
      'Revisa la opcion que necesitas.',
      'Haz clic y yo te llevare al lugar correcto.',
      'Si tienes dudas, usa Soporte Directo.'
    ]
  };

  private readonly remiResponses: Record<RemiAction, RemiResponse> = {
    home: {
      title: 'Inicio — Pasos rápidos',
      message: 'Aquí tienes pasos claros para orientarte en la página de inicio:',
      steps: ['1) Lee el propósito del proyecto.', '2) Revisa las métricas principales.', '3) Usa los botones para historias o contacto.']
    },
    login: {
      title: 'Acceso — Paso a paso',
      message: 'Sigue estos pasos para iniciar sesión de forma segura:',
      steps: ['1) Introduce tu usuario.', '2) Escribe tu contraseña.', "3) Haz clic en 'Acceder' y verifica si hay mensajes de error."]
    },
    jornada: {
      title: 'Solicitar jornada — Paso a paso',
      message: 'Para solicitar una jornada, sigue estas acciones concisas:',
      steps: ['1) Completa el formulario con datos de contacto.', '2) Describe brevemente la necesidad de la comunidad.', '3) Envía la solicitud y espera confirmación del equipo.']
    },
    donacion: {
      title: 'Donaciones — Guía rápida',
      message: 'Tu donación ayuda: estos son los pasos para completar el aporte:',
      steps: ['1) Revisa los métodos de donación disponibles.', '2) Ingresa el monto y tus datos.', '3) Confirma y guarda el comprobante.']
    },
    game: {
      title: 'Recreación — Paso a paso',
      message: 'Minijuego Remi Space: instrucciones simples para disfrutar:',
      steps: ['1) Abre el minijuego desde el menú.', '2) Sigue las instrucciones en pantalla.', '3) Usa el botón salir para regresar al sitio.']
    },
    soporte: {
      title: 'Soporte — Guía clara',
      message: 'Si necesitas ayuda directa, realiza estos pasos:',
      steps: ['1) Completa nombre y correo.', '2) Selecciona el asunto más relevante.', '3) Describe tu problema con claridad y envía.']
    },
    dashboard: {
      title: 'Panel — Acciones rápidas',
      message: 'Al acceder al panel administrativo, prioriza estas acciones:',
      steps: ['1) Revisa el resumen de métricas.', '2) Accede a gestión de usuarios o reportes.', '3) Descarga o exporta los datos necesarios.']
    },
    blog: {
      title: 'Gestión de Noticias — Remi Control',
      message: 'Desde el panel puedes publicar novedades e historias de impacto social:',
      steps: ['1) Escribe un título atractivo.', '2) Sube una imagen clara (formato 16:9).', '3) Publica para actualizar el sitio automáticamente.']
    }
  };

  private routerNavSubscription: any;
  private remiOpenListener: any;

  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('carouselTrack') carouselTrack!: ElementRef;

  // Carousel state
  public carouselIndex: number = 0;
  private carouselIntervalId: any;
  private carouselSlideCount: number = 3;

  constructor(private router: Router) {}


  ngOnInit(): void {
    // La burbuja de Alitas aparece 2 segundos después de cargar
    setTimeout(() => {
      this.showWelcome = true;
    }, 2000);
    // Mostrar instrucciones de Remi (paso a paso) en cada navegación
    this.routerNavSubscription = this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        const url = evt.urlAfterRedirects || this.router.url;
        const action: RemiAction = this.mapUrlToRemiAction(url);
        this.remiResponse = this.remiResponses[action];
        // El asistente virtual sólo se muestra en la página de inicio
        const homePage = this.isHomePage();
        this.showWelcome = homePage;
        if (!homePage) {
          this.isChatOpen = false;
        }
      }
    });

    // Listen for global Remi open events
    this.remiOpenListener = () => this.toggleChat();
    window.addEventListener('openRemiChat', this.remiOpenListener);
    // leave actual carousel start to AfterViewInit (DOM must exist)
  }

  ngAfterViewInit(): void {
    // detect number of slides if available
    try {
      const trackEl = this.carouselTrack?.nativeElement as HTMLElement;
      if (trackEl) {
        this.carouselSlideCount = Math.max(1, trackEl.children.length);
        // mark that JS will control the carousel (disable CSS-only animation)
        const carouselRoot = trackEl.closest('.global-carousel');
        if (carouselRoot) carouselRoot.classList.add('js-controlled');
        this.startCarousel();
      }
    } catch (e) {
      // ignore
    }
  }

  ngOnDestroy(): void {
    if (this.carouselIntervalId) clearInterval(this.carouselIntervalId);
    if (this.routerNavSubscription) this.routerNavSubscription.unsubscribe();
    if (this.remiOpenListener) window.removeEventListener('openRemiChat', this.remiOpenListener);
  }

  private mapUrlToRemiAction(url: string): RemiAction {
    if (url.startsWith('/admin')) return 'dashboard';
    if (url.startsWith('/solicitar-jornada')) return 'jornada';
    if (url.startsWith('/remi-game')) return 'game';
    if (url.startsWith('/login')) return 'login';
    if (url.startsWith('/contacto')) return 'soporte';
    if (url.startsWith('/donar') || url.includes('donacion')) return 'donacion';
    if (url.startsWith('/blog') || url.startsWith('/admin/blog')) return 'blog';
    return 'home';
  }

  private startCarousel(): void {
    this.stopCarousel();
    this.carouselIntervalId = setInterval(() => this.nextCarousel(), 4500);
  }

  private stopCarousel(): void {
    if (this.carouselIntervalId) { clearInterval(this.carouselIntervalId); this.carouselIntervalId = null; }
  }

  public nextCarousel(): void {
    this.goToCarousel((this.carouselIndex + 1) % this.carouselSlideCount);
  }

  public prevCarousel(): void {
    this.goToCarousel((this.carouselIndex - 1 + this.carouselSlideCount) % this.carouselSlideCount);
  }

  public goToCarousel(index: number): void {
    this.carouselIndex = index;
    if (!this.carouselTrack) return;
    const trackEl = this.carouselTrack.nativeElement as HTMLElement;
    const percent = (index * (100 / this.carouselSlideCount));
    trackEl.style.transform = `translateX(-${percent}% )`;
    // restart autoplay
    this.startCarousel();
  }

  /**
   * Determina si el usuario está en una página de autenticación.
   * Útil para usarlo en el HTML con: <header *ngIf="!isAuthPage()">
   */
  isAuthPage(): boolean {
    const authRoutes = ['/login', '/forgot-password', '/support'];
    // Retorna true si la URL actual coincide con alguna ruta de auth
    return authRoutes.some(route => this.router.url.includes(route));
  }

  isPortalPage(): boolean {
    const portalRoutes = [
      '/admin/usuarios',
      '/admin/docentes',
      '/admin/estudiantes',
      '/admin/dashboard',
      '/admin',
      '/brigada-juridica',
      '/seguimiento',
      '/docente',
      '/admin/blog'
    ];
    return portalRoutes.some(route => this.router.url.startsWith(route));
  }

  showPublicLayout(): boolean {
    return !this.isAuthPage() && !this.isPortalPage();
  }

  isHomePage(): boolean {
    const currentUrl = this.router.url || '';
    return currentUrl === '/home' || currentUrl === '/' || currentUrl.startsWith('/home');
  }

  /**
   * Abre y cierra el chat de Remi
   */
  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
    // Si abre el chat, ocultamos la burbuja de bienvenida para que no estorbe
    if (this.isChatOpen) {
      this.showWelcome = false;
    }
  }

  /**
   * Abre y cierra el modal de donación
   */
  toggleDonacion(): void {
    this.showDonacion = !this.showDonacion;
  }

  /** Toggle mobile navigation menu */
  toggleMobileMenu(event?: Event): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    try {
      const btn = event?.currentTarget as HTMLElement | undefined;
      if (btn) btn.setAttribute('aria-expanded', String(this.mobileMenuOpen));
    } catch (e) {}
  }

  handleRemiAction(action: RemiAction): void {
    this.remiResponse = this.remiResponses[action];
    this.showWelcome = false;
    this.isChatOpen = true;

    const routes: Partial<Record<RemiAction, string>> = {
      home: '/home',
      login: '/login',
      jornada: '/solicitar-jornada',
      game: '/remi-game',
      soporte: '/contacto',
      dashboard: '/admin/dashboard',
      blog: '/blog'
    };

    if (action === 'donacion') {
      this.showDonacion = true;
      return;
    }

    const targetRoute = routes[action];
    if (targetRoute) {
      this.router.navigate([targetRoute]);
    }
  }

  /**
   * Lógica para el footer o boletines
   */
  onSubscribe(): void {
    const email = this.emailInput?.nativeElement?.value;
    if (email && email.includes('@')) {
      alert('✅ ¡Gracias por suscribirte al boletín de Proyección Social!');
      this.emailInput.nativeElement.value = '';
    } else {
      alert('❌ Por favor, ingresa un correo válido.');
    }
  }
}
