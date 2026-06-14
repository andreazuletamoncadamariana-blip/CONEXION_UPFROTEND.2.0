import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstudianteService } from '../../services/estudiante.services';

export interface Estudiante {
  id?: number;
  nombre: string;
  email: string;
  documento: string;
  facultad: string;
  password?: string;
  activo: boolean;
}

export interface FacultadEstadistica {
  nombre: string;
  cantidad: number;
  porcentaje: number;
  icono: string;
}

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [EstudianteService],
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss']
})
export class EstudiantesComponent implements OnInit {
  mostrarFormulario = false;
  modoEdicion = false;
  filtro = '';
  cargando = false;
  guardando = false;
  mensajeExito = '';
  estudiantes: Estudiante[] = [];
  facultades = [
    'Ingeniería',
    'Ciencias Económicas',
    'Artes y Humanidades',
    'Salud',
    'Ciencias Básicas',
    'Derecho',
    'Educación'
  ];
  facultadesIconos: { [key: string]: string } = {
    'Ingeniería': 'fa-gears',
    'Ciencias Económicas': 'fa-chart-line',
    'Artes y Humanidades': 'fa-palette',
    'Salud': 'fa-heart',
    'Ciencias Básicas': 'fa-microscope',
    'Derecho': 'fa-balance-scale',
    'Educación': 'fa-book'
  };
  estudianteForm: Estudiante = this.crearObjetoVacio();

  constructor(
    private estudianteService: EstudianteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEstudiantes();
    this.route.queryParams.subscribe(params => {
      const crear = params['crear'];
      if (crear === 'true' || crear === '1') {
        this.abrirFormularioCrear();
      }
    });
  }

  crearObjetoVacio(): Estudiante {
    return { nombre: '', email: '', documento: '', facultad: '', password: '', activo: true };
  }

  cargarEstudiantes(): void {
    this.cargando = true;
    this.estudianteService.listarEstudiantes().subscribe({
      next: data => this.estudiantes = data || [],
      complete: () => this.cargando = false,
      error: () => this.cargando = false
    });
  }

  abrirFormularioCrear(): void {
    this.modoEdicion = false;
    this.estudianteForm = this.crearObjetoVacio();
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
  }

  cancelar(): void {
    this.cerrarFormulario();
  }

  volverAlPanel(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  guardarEstudiante(): void {
    if (!this.validarEstudiante()) {
      return;
    }

    this.guardando = true;
    const mensaje = this.modoEdicion ? 'Estudiante actualizado con éxito' : 'Estudiante creado con éxito';
    const payload = { ...this.estudianteForm };
    if (this.modoEdicion && !payload.password) {
      delete payload.password;
    }

    const peticion = this.modoEdicion && this.estudianteForm.id
      ? this.estudianteService.actualizarEstudiante(this.estudianteForm.id, payload)
      : this.estudianteService.crearEstudiante(payload);

    peticion.subscribe({
      next: () => {
        const esCreacion = !this.modoEdicion;
        this.cargarEstudiantes();
        this.cerrarFormulario();
        this.mostrarExito(mensaje);
        if (esCreacion) {
          this.router.navigate(['/admin/dashboard']);
        }
      },
      error: () => {
        this.mensajeExito = 'Error al guardar el estudiante. Intenta de nuevo.';
      },
      complete: () => {
        this.guardando = false;
      }
    });
  }

  validarEstudiante(): boolean {
    if (!this.estudianteForm.nombre.trim() || !this.estudianteForm.email.trim() || !this.estudianteForm.documento.trim() || !this.estudianteForm.facultad) {
      alert('Por favor completa todos los campos obligatorios del formulario.');
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.estudianteForm.email.trim())) {
      alert('Por favor ingresa un correo electrónico válido.');
      return false;
    }

    if (!this.modoEdicion && !this.estudianteForm.password) {
      alert('Por favor crea una contraseña segura para el estudiante.');
      return false;
    }

    return true;
  }

  mostrarExito(texto: string): void {
    this.mensajeExito = texto;
    setTimeout(() => this.mensajeExito = '', 3600);
  }

  editarEstudiante(est: Estudiante): void {
    this.modoEdicion = true;
    this.estudianteForm = { ...est, password: '' };
    this.mostrarFormulario = true;
  }

  eliminarEstudiante(est: Estudiante): void {
    if (!est.id) {
      return;
    }
    if (confirm('¿Confirmar eliminación?')) {
      this.estudianteService.eliminarEstudiante(est.id).subscribe(() => this.cargarEstudiantes());
    }
  }

  get estudiantesFiltrados(): Estudiante[] {
    const texto = this.filtro.trim().toLowerCase();
    if (!texto) {
      return this.estudiantes;
    }
    return this.estudiantes.filter(e => e.nombre.toLowerCase().includes(texto) ||
      e.email.toLowerCase().includes(texto) ||
      e.documento.toLowerCase().includes(texto));
  }

  getFacultadesEstadisticas(): FacultadEstadistica[] {
    const totalEstudiantes = this.estudiantes.length || 1;
    return this.facultades.map(facultad => {
      const cantidad = this.estudiantes.filter(e => e.facultad === facultad).length;
      const porcentaje = Math.round((cantidad / totalEstudiantes) * 100);
      return {
        nombre: facultad,
        cantidad,
        porcentaje,
        icono: this.facultadesIconos[facultad] || 'fa-circle'
      };
    });
  }
}
