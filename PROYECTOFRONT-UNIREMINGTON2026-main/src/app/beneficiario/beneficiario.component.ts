import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { BeneficiarioService } from '../services/beneficiario.services';
import { Beneficiario } from '../models/beneficiario.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-beneficiario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './beneficiario.component.html',
  styleUrls: ['./beneficiario.component.scss']
})
export class BeneficiarioComponent implements OnInit {
  readonly generos = ['Masculino', 'Femenino', 'Otro'];
  readonly tiposPoblacion = ['Emprendedor', 'Empresario', 'Comunidad', 'Productor'];

  beneficiarios: Beneficiario[] = [];
  cargando = false;
  error = '';
  mensaje = '';
  editandoId: number | null = null;

  private readonly fb = inject(FormBuilder);
  private readonly beneficiarioService = inject(BeneficiarioService);

  // Formulario principal
  readonly form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    documento: ['', Validators.required],
    telefono: ['', Validators.required],
    edad: [null as number | null, [Validators.min(0), Validators.max(120)]],
    genero: ['', Validators.required],
    municipio: ['', Validators.required],
    barrio: ['', Validators.required],
    poblacion: ['', Validators.required],
    servicio: ['', Validators.required]
  });

  // Control para el buscador
  readonly filtroDocumento = this.fb.nonNullable.control('');

  ngOnInit(): void {
    this.cargarBeneficiarios();
  }

  cargarBeneficiarios(): void {
    this.cargando = true;
    this.beneficiarioService.listar().subscribe({
      next: (data) => {
        this.beneficiarios = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'No se pudo conectar con el servidor';
        this.cargando = false;
      }
    });
  }

  buscarPorDocumento(): void {
    const doc = this.filtroDocumento.value.trim();
    if (!doc) {
      this.cargarBeneficiarios();
      return;
    }
    this.cargando = true;
    this.error = '';
    this.beneficiarioService.buscarPorDocumento(doc).subscribe({
      next: (b) => {
        this.beneficiarios = [b];
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se encontró beneficiario con ese documento';
        this.beneficiarios = [];
        this.cargando = false;
      }
    });
  }

  limpiarBusqueda(): void {
    this.filtroDocumento.setValue('');
    this.error = '';
    this.cargarBeneficiarios();
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Por favor, complete todos los campos requeridos correctamente';
      return;
    }

    const data = this.form.getRawValue();
    if (this.editandoId) {
      this.beneficiarioService.actualizar(this.editandoId, data).subscribe({
        next: () => {
          this.mensaje = 'Actualizado con éxito';
          this.cancelarEdicion();
          this.cargarBeneficiarios();
        }
      });
    } else {
      this.beneficiarioService.crear(data).subscribe({
        next: () => {
          this.mensaje = 'Creado con éxito';
          this.form.reset();
          this.cargarBeneficiarios();
        },
        error: () => this.error = 'Error al crear el registro'
      });
    }
  }

  iniciarEdicion(b: Beneficiario): void {
    this.editandoId = b.id ?? null;
    this.form.patchValue(b);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.form.reset();
    this.error = '';
  }

  eliminar(id?: number): void {
    if (id && confirm('¿Eliminar este beneficiario?')) {
      this.beneficiarioService.eliminar(id).subscribe(() => this.cargarBeneficiarios());
    }
  }
}
