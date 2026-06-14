import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicioPrestadoService } from '../services/servicioprestado.services';
import { ServicioPrestado } from '../models/servicioprestado.model';

@Component({
  selector: 'app-servicioprestado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './servicioprestado.component.html',
  styleUrls: ['./servicioprestado.component.css'],
})
export class ServicioPrestadoComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly servicioPrestadoService = inject(ServicioPrestadoService);

  readonly servicios = [
    { nombre: 'Bienestar Animal', facultad: 'Veterinaria' },
    { nombre: 'Brigada Juridica', facultad: 'Ciencias Juridicas' },
    { nombre: 'Salud Comunitaria', facultad: 'Ciencias de la Salud' },
    { nombre: 'Asesorias Empresariales', facultad: 'Ciencias Empresariales' },
    { nombre: 'Diseno e Imagen Corporativa', facultad: 'Artes y Humanidades' },
    { nombre: 'Consultorio Contable', facultad: 'Ciencias Contables' },
    { nombre: 'Ingenieria y Medio Ambiente', facultad: 'Ingenieria' }
  ];

  readonly estados = ['Completado', 'En progreso', 'Pendiente', 'Cancelado'];
  registros: ServicioPrestado[] = [];
  mensaje = '';
  error = '';
  editandoId: number | null = null;

  readonly form = this.fb.nonNullable.group({
    servicio: ['', Validators.required],
    beneficiario: ['', Validators.required],
    documento: ['', Validators.required],
    municipio: ['', Validators.required],
    fecha: ['', Validators.required],
    responsable: [localStorage.getItem('user_name') || '', Validators.required],
    estado: ['Pendiente', Validators.required],
    observaciones: ['']
  });

  ngOnInit(): void {
    this.cargarRegistros();
  }

  get totalAtenciones(): number {
    return this.registros.length;
  }

  get completados(): number {
    return this.registros.filter((registro) => registro.estado === 'Completado').length;
  }

  get pendientes(): number {
    return this.registros.filter((registro) => registro.estado !== 'Completado').length;
  }

  cargarRegistros(): void {
    this.servicioPrestadoService.listarTodos().subscribe({
      next: (data) => {
        this.registros = data;
      },
      error: (err) => {
        console.error('Error al obtener registros del backend:', err);
        this.error = 'No se pudo conectar con el servidor para cargar los datos.';
      }
    });
  }

  guardar(): void {
    this.mensaje = '';
    this.error = '';

    if (this.form.invalid) {
      this.error = 'Completa todos los campos obligatorios para guardar el servicio.';
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.getRawValue();
    const servicioSeleccionado = this.servicios.find((item) => item.nombre === data.servicio);

    const registroPayload: ServicioPrestado = {
      servicio: data.servicio,
      facultad: servicioSeleccionado?.facultad || 'Sin facultad',
      beneficiario: data.beneficiario.trim(),
      documento: data.documento.trim(),
      municipio: data.municipio.trim(),
      fecha: data.fecha,
      responsable: data.responsable.trim(),
      estado: data.estado,
      observaciones: data.observaciones.trim()
    };

    if (this.editandoId !== null) {
      this.servicioPrestadoService.actualizar(this.editandoId, registroPayload).subscribe({
        next: () => {
          this.mensaje = 'Servicio actualizado correctamente.';
          this.cargarRegistros();
          this.cancelarEdicion();
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          this.error = 'Error al intentar actualizar el registro en el servidor.';
        }
      });
    } else {
      this.servicioPrestadoService.crear(registroPayload).subscribe({
        next: () => {
          this.mensaje = 'Servicio registrado correctamente.';
          this.cargarRegistros();
          this.cancelarEdicion();
        },
        error: (err) => {
          console.error('Error al crear:', err);
          this.error = 'Error de comunicación: no se pudo almacenar en la base de datos.';
        }
      });
    }
  }

  editar(registro: ServicioPrestado): void {
    this.editandoId = registro.id !== undefined ? registro.id : null;

    this.form.patchValue({
      servicio: registro.servicio || '',
      beneficiario: registro.beneficiario || '',
      documento: registro.documento || '',
      municipio: registro.municipio || '',
      fecha: registro.fecha || '',
      responsable: registro.responsable || '',
      estado: registro.estado || 'Pendiente',
      observaciones: registro.observaciones || ''
    });
    this.mensaje = '';
    this.error = '';
  }

  eliminar(id: number | undefined): void {
    if (id === undefined || id === null) {
      this.error = 'No se puede eliminar un registro que no posea un ID válido.';
      return;
    }

    if (!confirm('¿Deseas eliminar este registro de servicio de la base de datos?')) return;

    this.servicioPrestadoService.eliminar(id).subscribe({
      next: () => {
        this.mensaje = 'Servicio eliminado correctamente.';
        this.cargarRegistros();
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        this.error = 'No se pudo eliminar el registro seleccionado del servidor.';
      }
    });
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.form.reset({
      servicio: '',
      beneficiario: '',
      documento: '',
      municipio: '',
      fecha: '',
      responsable: localStorage.getItem('user_name') || '',
      estado: 'Pendiente',
      observaciones: ''
    });
  }

  getEstadoClass(estado: string): string {
    const estadoMap: Record<string, string> = {
      'Completado': 'completado',
      'En progreso': 'enProgreso',
      'Pendiente': 'pendiente',
      'Cancelado': 'cancelado'
    };
    return estadoMap[estado] || '';
  }
}
