import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DocenteService } from '../../services/docente.services';
import { EstudianteService } from '../../services/estudiante.services';
import { BlogPost, BlogService } from '../../services/blog.services';

interface DashboardWidget {
  label: string;
  value: string | number;
  detail: string;
  icon: string;
  accent: 'blue' | 'green' | 'violet' | 'orange';
  route: string;
}

interface SetupStep {
  title: string;
  description: string;
  icon: string;
  done: boolean;
  action: string;
  route: string;
}

interface ServiceRow {
  name: string;
  owner: string;
  status: 'En linea' | 'Pendiente' | 'Revision';
  progress: number;
  icon: string;
}

interface ActivityItem {
  title: string;
  description: string;
  time: string;
  icon: string;
}

type BlogAdminMode = 'agregar' | 'editar' | 'anexar' | 'quitar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  totalDocentes = 0;
  totalEstudiantes = 0;
  serviciosActivos = 6;
  reportesPendientes = 3;
  blogMode: BlogAdminMode = 'agregar';
  blogPosts: BlogPost[] = [];
  selectedBlogPostId = 0;
  blogMessage = '';
  blogForm = this.getEmptyBlogForm();
  appendContent = '';
  private blogSubscription?: Subscription;

  setupSteps: SetupStep[] = [
    { title: 'Perfil institucional', description: 'Verifica datos de contacto, sede y responsables administrativos.', icon: 'fa-solid fa-building-columns', done: true, action: 'Revisar usuarios', route: '/admin/usuarios' },
    { title: 'Equipo docente', description: 'Mantiene docentes activos, roles y asignaciones actualizadas.', icon: 'fa-solid fa-chalkboard-user', done: true, action: 'Gestionar docentes', route: '/admin/docentes' },
    { title: 'Reportes operativos', description: 'Consulta indicadores, exportaciones y actividad reciente.', icon: 'fa-solid fa-chart-line', done: false, action: 'Ver reportes', route: '/admin/reportes' },
    { title: 'Servicios vinculados', description: 'Supervisa servicios prestados y seguimiento comunitario.', icon: 'fa-solid fa-network-wired', done: false, action: 'Abrir servicios', route: '/servicios-prestados' }
  ];

  widgets: DashboardWidget[] = [];
  topServices: ServiceRow[] = [
    { name: 'Gestion academica', owner: 'Coordinacion administrativa', status: 'En linea', progress: 94, icon: 'fa-solid fa-graduation-cap' },
    { name: 'Seguimiento comunitario', owner: 'Proyeccion social', status: 'En linea', progress: 88, icon: 'fa-solid fa-people-group' },
    { name: 'Reportes e indicadores', owner: 'Analitica institucional', status: 'Revision', progress: 76, icon: 'fa-solid fa-chart-simple' },
    { name: 'Servicios prestados', owner: 'Equipo operativo', status: 'Pendiente', progress: 64, icon: 'fa-solid fa-handshake-angle' }
  ];

  recentLogins: ActivityItem[] = [
    { title: 'Administrador principal', description: 'Ingreso al panel de control', time: 'Hace 8 min', icon: 'fa-solid fa-user-shield' },
    { title: 'Modulo de docentes', description: 'Actualizacion de registro academico', time: 'Hace 34 min', icon: 'fa-solid fa-chalkboard-user' },
    { title: 'Modulo de reportes', description: 'Consulta de indicadores operativos', time: 'Hace 2 horas', icon: 'fa-solid fa-file-lines' }
  ];

  constructor(
    private router: Router,
    private estudianteService: EstudianteService,
    private docenteService: DocenteService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.actualizarWidgets();
    this.cargarEstadisticas();
    this.blogSubscription = this.blogService.posts$.subscribe((posts) => {
      this.blogPosts = posts;

      if (!this.selectedBlogPostId && posts.length) {
        this.selectedBlogPostId = posts[0].id;
      }
    });
  }

  ngOnDestroy(): void {
    this.blogSubscription?.unsubscribe();
  }

  setBlogMode(mode: BlogAdminMode): void {
    this.blogMode = mode;
    this.blogMessage = '';

    if (mode === 'agregar') {
      this.blogForm = this.getEmptyBlogForm();
      this.appendContent = '';
      return;
    }

    this.cargarNoticiaSeleccionada();
  }

  cargarNoticiaSeleccionada(): void {
    const selectedPost = this.blogPosts.find((post) => post.id === Number(this.selectedBlogPostId));

    if (!selectedPost) {
      this.blogForm = this.getEmptyBlogForm();
      return;
    }

    this.blogForm = {
      title: selectedPost.title,
      category: selectedPost.category,
      image: selectedPost.image,
      content: selectedPost.content
    };
  }

  guardarNoticia(): void {
    const normalizedPost = {
      title: this.blogForm.title.trim(),
      category: this.blogForm.category.trim(),
      image: this.blogForm.image.trim(),
      content: this.blogForm.content.trim()
    };

    if (!normalizedPost.title || !normalizedPost.category || !normalizedPost.image || !normalizedPost.content) {
      this.blogMessage = 'Completa titulo, categoria, imagen y contenido antes de guardar.';
      return;
    }

    if (this.blogMode === 'editar') {
      this.blogService.modificarNoticia(Number(this.selectedBlogPostId), normalizedPost);
      this.blogMessage = 'Noticia actualizada en el blog.';
      return;
    }

    this.blogService.agregarNoticia(normalizedPost);
    this.blogForm = this.getEmptyBlogForm();
    this.blogMessage = 'Noticia agregada al blog.';
  }

  anexarNoticia(): void {
    if (!this.selectedBlogPostId || !this.appendContent.trim()) {
      this.blogMessage = 'Selecciona una noticia y escribe el texto que deseas anexar.';
      return;
    }

    this.blogService.anexarContenido(Number(this.selectedBlogPostId), this.appendContent);
    this.appendContent = '';
    this.cargarNoticiaSeleccionada();
    this.blogMessage = 'Contenido anexado a la noticia.';
  }

  quitarNoticia(): void {
    const selectedPost = this.blogPosts.find((post) => post.id === Number(this.selectedBlogPostId));

    if (!selectedPost) {
      this.blogMessage = 'Selecciona una noticia para quitar.';
      return;
    }

    if (confirm(`Seguro que deseas quitar "${selectedPost.title}" del blog?`)) {
      this.blogService.quitarNoticia(selectedPost.id);
      this.selectedBlogPostId = this.blogPosts[0]?.id ?? 0;
      this.cargarNoticiaSeleccionada();
      this.blogMessage = 'Noticia quitada del blog.';
    }
  }

  abrirBlogPublico(): void {
    this.router.navigate(['/blog']);
  }

  cargarEstadisticas(): void {
    this.estudianteService.listarEstudiantes().subscribe({
      next: (data: unknown[]) => {
        this.totalEstudiantes = data ? data.length : 0;
        this.actualizarWidgets();
      },
      error: (err: unknown) => console.error(err)
    });
    this.docenteService.listarDocentes().subscribe({
      next: (data: unknown[]) => {
        this.totalDocentes = data ? data.length : 0;
        this.actualizarWidgets();
      },
      error: (err: unknown) => console.error(err)
    });
  }

  actualizarWidgets(): void {
    this.widgets = [
      { label: 'Estudiantes activos', value: this.totalEstudiantes, detail: 'Usuarios vinculados al sistema.', icon: 'fa-solid fa-user-graduate', accent: 'blue', route: '/admin/usuarios' },
      { label: 'Docentes activos', value: this.totalDocentes, detail: 'Personal disponible.', icon: 'fa-solid fa-chalkboard-user', accent: 'green', route: '/admin/docentes' },
      { label: 'Servicios en linea', value: this.serviciosActivos, detail: 'Procesos operativos.', icon: 'fa-solid fa-signal', accent: 'violet', route: '/servicios-prestados' },
      { label: 'Reportes pendientes', value: this.reportesPendientes, detail: 'Informes por revisar.', icon: 'fa-solid fa-clipboard-list', accent: 'orange', route: '/admin/reportes' }
    ];
  }

  navegarA(ruta: string): void {
    this.router.navigate([ruta]);
  }

  navegarACrearDocente(): void {
    this.router.navigate(['/admin/docentes'], { queryParams: { crear: 'true' } });
  }

  navegarACrearEstudiante(): void {
    this.router.navigate(['/admin/usuarios'], { queryParams: { crear: 'true' } });
  }

  abrirReportes(): void {
    this.router.navigate(['/admin/reportes']);
  }

  cerrarSesion(): void {
    if (confirm('Seguro que deseas cerrar sesion?')) {
      localStorage.removeItem('user_session');
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_name');
      this.router.navigate(['/login']);
    }
  }

  private getEmptyBlogForm(): Omit<BlogPost, 'id' | 'isFlipped'> {
    return {
      title: '',
      category: 'Social',
      image: 'assets/images/compromiso.jpg.jpg',
      content: ''
    };
  }
}
