import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Docente } from '../../models/docente.model';
import { DocenteService } from '../../services/docente.services';

@Component({
  selector: 'app-docentes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.scss']
})
export class DocentesComponent implements OnInit {
  mostrarFormulario = false;
  modoEdicion = false;
  filtro = '';
  cargando = false;
  guardando = false;
  mensajeExito = '';
  docentes: Docente[] = [];
  docenteForm: Docente = this.crearDocenteVacio();

  facultades = [
    'Ingeniería',
    'Ciencias Administrativas',
    'Ciencias Sociales y Humanas',
    'Derecho',
    'Educación',
    'Salud',
    'Artes y Diseño'
  ];

  constructor(
    private docenteService: DocenteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarDocentes();
    this.route.queryParams.subscribe(params => {
      const crear = params['crear'];
      if (crear === 'true' || crear === '1') {
        this.abrirFormularioCrear();
      }
    });
  }

  cargarDocentes(): void {
    this.cargando = true;
    this.docenteService.listarDocentes().subscribe({
      next: data => this.docentes = data || [],
      complete: () => this.cargando = false,
      error: () => this.cargando = false
    });
  }

  abrirFormularioCrear(): void {
    this.modoEdicion = false;
    this.docenteForm = this.crearDocenteVacio();
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
  }

  cancelar(): void {
    this.cerrarFormulario();
  }

  guardarDocente(): void {
    if (!this.docenteForm.correoInstitucional) {
      alert('El correo institucional es obligatorio.');
      return;
    }

    if (!this.modoEdicion && !this.docenteForm.contrasenaAcceso) {
      alert('La contraseña es obligatoria para crear un docente.');
      return;
    }

    if (!this.validar()) {
      return;
    }

    this.guardando = true;
    const mensaje = this.modoEdicion ? 'Docente actualizado con éxito' : 'Docente creado con éxito';

    const payload: any = {
      ...this.docenteForm,
      email: this.docenteForm.correoInstitucional,
      password: this.docenteForm.contrasenaAcceso
    };

    if (this.modoEdicion && !payload.password) {
      delete payload.password;
      delete payload.contrasenaAcceso;
    }

    const peticion = this.modoEdicion && this.docenteForm.id
      ? this.docenteService.actualizarDocente(this.docenteForm.id, payload)
      : this.docenteService.crearDocente(payload);

    peticion.subscribe({
      next: () => {
        this.cargarDocentes();
        this.cerrarFormulario();
        this.mostrarExito(mensaje);
      },
      error: () => {
        this.mensajeExito = 'Error al guardar el docente. Intenta de nuevo.';
      },
      complete: () => {
        this.guardando = false;
      }
    });
  }

  mostrarExito(texto: string): void {
    this.mensajeExito = texto;
    setTimeout(() => this.mensajeExito = '', 3600);
  }

  editarDocente(docente: Docente): void {
    this.modoEdicion = true;
    this.docenteForm = { ...docente, contrasenaAcceso: '', password: '' };
    this.mostrarFormulario = true;
  }

  eliminarDocente(docente: Docente): void {
    if (!docente.id) {
      return;
    }
    if (confirm('¿Confirmar eliminación del docente?')) {
      this.docenteService.eliminarDocente(docente.id).subscribe({
        next: () => this.cargarDocentes(),
        error: () => alert('Error eliminando docente. Intenta de nuevo.')
      });
    }
  }

  get docentesFiltrados(): Docente[] {
    const texto = this.filtro.trim().toLowerCase();
    if (!texto) {
      return this.docentes;
    }
    return this.docentes.filter(d =>
      d.nombre.toLowerCase().includes(texto) ||
      d.apellido.toLowerCase().includes(texto) ||
      d.documento.toLowerCase().includes(texto) ||
      d.correoInstitucional.toLowerCase().includes(texto)
    );
  }

  private validar(): boolean {
    if (!this.docenteForm.facultad) {
      alert('Selecciona una facultad');
      return false;
    }
    return true;
  }

  private crearDocenteVacio(): Docente {
    return {
      nombre: '',
      apellido: '',
      documento: '',
      correoInstitucional: '',
      contrasenaAcceso: '',
      facultad: '',
      especialidad: '',
      estado: 'Activo'
    };
  }
}
