import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteService } from '../../services/estudiante.services';

// 1. Declaramos la Interfaz DIRECTAMENTE aquí para evitar errores de tipo declarations externos
export interface Estudiante {
  id?: number;
  nombre: string;
  email: string;
  documento: string;
  facultad: string;
  password?: string;
  activo: boolean;
  role?: string;
}

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss']
})
export class EstudiantesComponent implements OnInit {

  mostrarFormulario: boolean = false;
  modoEdicion: boolean = false;
  filtro: string = '';

  estudianteForm: Estudiante = this.inicializarFormulario();
  estudiantes: Estudiante[] = [];
  cargando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private estudianteService: EstudianteService
  ) {}

  ngOnInit(): void {
    this.cargarEstudiantes();

    this.route.queryParams.subscribe((params: any) => {
      if (params['mode'] === 'create') {
        this.abrirFormularioCrear();
        this.router.navigate([], { queryParams: { mode: null }, queryParamsHandling: 'merge' });
      }
    });
  }

  get estudiantesActivos(): number {
    return this.estudiantes.filter(e => e.activo).length;
  }

  get estudiantesInactivos(): number {
    return this.estudiantes.filter(e => !e.activo).length;
  }

  abrirFormularioCrear(): void {
    this.modoEdicion = false;
    this.mostrarFormulario = true;
    this.estudianteForm = this.inicializarFormulario();
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.modoEdicion = false;
    this.estudianteForm = this.inicializarFormulario();
  }

  guardarEstudiante(): void {
    if (!this.formularioValido()) {
      alert('Por favor completa los campos obligatorios.');
      return;
    }

    const payload = this.normalizarEstudiante(this.estudianteForm);

    if (this.modoEdicion) {
      if (payload.id) {
        this.estudianteService.actualizarEstudiante(payload.id, payload).subscribe({
          next: () => {
            alert('Estudiante actualizado con éxito');
            this.cerrarFormulario();
            this.cargarEstudiantes();
          },
          error: (err: any) => { // 🔥 Corregido implícito any
            console.error('Error al actualizar estudiante:', err);
            this.manejarError(err, 'actualizar');
          }
        });
      } else {
        alert('Error: No se encontró el ID del estudiante para editar.');
      }
    } else {
      this.estudianteService.crearEstudiante(payload).subscribe({
        next: () => {
          alert('Estudiante registrado con éxito');
          this.cerrarFormulario();
          this.cargarEstudiantes();
        },
        error: (err: any) => { // 🔥 Corregido implícito any
          console.error('Error al crear estudiante:', err);
          this.manejarError(err, 'crear');
        }
      });
    }
  }

  editarEstudiante(estudiante: Estudiante): void {
    this.modoEdicion = true;
    this.mostrarFormulario = true;
    this.estudianteForm = {
      ...estudiante,
      password: '' // Limpiamos el campo de contraseña por seguridad al editar
    };
  }

  eliminarEstudiante(estudiante: Estudiante): void {
    if (estudiante.id && confirm(`¿Estás seguro de eliminar a ${estudiante.nombre}?`)) {
      this.estudianteService.eliminarEstudiante(estudiante.id).subscribe({
        next: () => {
          alert('Estudiante eliminado con éxito');
          this.cargarEstudiantes();
        },
        error: (err: any) => { // 🔥 Corregido implícito any
          console.error('Error al eliminar estudiante:', err);
          this.manejarError(err, 'eliminar');
        }
      });
    }
  }

  cargarEstudiantes(): void {
    this.cargando = true;
    this.estudianteService.listarEstudiantes().subscribe({
      next: (data: Estudiante[]) => {
        this.estudiantes = (data || []).map(e => this.normalizarEstudiante(e));
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al cargar estudiantes', err);
        this.cargando = false;
      }
    });
  }

  get estudiantesFiltrados(): Estudiante[] {
    if (!this.filtro.trim()) {
      return this.estudiantes;
    }
    const busqueda = this.filtro.toLowerCase();
    return this.estudiantes.filter(e =>
      e.nombre.toLowerCase().includes(busqueda) ||
      e.email.toLowerCase().includes(busqueda) ||
      e.documento.includes(busqueda) ||
      e.facultad.toLowerCase().includes(busqueda)
    );
  }

  private manejarError(err: any, accion: string): void {
    const status = err?.status;
    const detalleRaw = err?.error;
    let backendMsg = 'Error inesperado en el servidor.';

    if (typeof detalleRaw === 'string') {
      backendMsg = detalleRaw;
    } else if (detalleRaw && typeof detalleRaw === 'object') {
      backendMsg = detalleRaw.message || detalleRaw.error || JSON.stringify(detalleRaw);
    }

    if (status === 400 && backendMsg.includes('is not valid JSON')) {
      const match = backendMsg.match(/"([^"]+)"/);
      backendMsg = match ? `Servidor dice: ${match[1]}` : 'Dato duplicado o incompleto.';
    }

    alert(`Error al ${accion} estudiante. Status: ${status ?? 'N/A'}. Detalle: ${backendMsg}`);
  }

  private inicializarFormulario(): Estudiante {
    return {
      nombre: '',
      email: '',
      documento: '',
      facultad: '',
      password: '',
      activo: true,
      role: 'ESTUDIANTE'
    };
  }

  private normalizarEstudiante(e: Estudiante): Estudiante {
    const normalizado = {
      ...e,
      nombre: String(e.nombre || '').trim(),
      email: String(e.email || '').trim(),
      documento: String(e.documento || '').trim(),
      facultad: String(e.facultad || '').trim(),
      password: e.password ? String(e.password).trim() : undefined,
      activo: e.activo !== false,
      role: e.role || 'ESTUDIANTE'
    };

    if (this.modoEdicion && !normalizado.password) {
      delete normalizado.password;
    }

    return normalizado;
  }

  private formularioValido(): boolean {
    const basic =
      this.estudianteForm.nombre.trim().length > 0 &&
      this.estudianteForm.email.trim().length > 0 &&
      this.estudianteForm.documento.trim().length > 0 &&
      this.estudianteForm.facultad.trim().length > 0;

    if (this.modoEdicion) return basic;
    return basic && (this.estudianteForm.password?.trim().length ?? 0) > 0;
  }
}
