import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DiagnosticoService } from '../services/diagnostico.services';
import { Diagnostico } from '../models/diagnostico.model';

@Component({
  selector: 'app-diagnostico',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './diagnostico.component.html',
  styleUrl: './diagnostico.component.scss'
})
export class DiagnosticoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private diagnosticoService = inject(DiagnosticoService);

  diagnosticoForm!: FormGroup;
  listaDiagnosticos: Diagnostico[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  ngOnInit(): void {
    this.initForm();
    this.cargarDiagnosticos();
  }

  private initForm(): void {
    this.diagnosticoForm = this.fb.group({
      municipio: ['', Validators.required],
      clasificacion: ['', Validators.required],
      descripcionProblematica: ['', [Validators.required, Validators.minLength(10)]],
      prioridad: ['', Validators.required]
    });
  }

  cargarDiagnosticos(): void {
    this.loading = true;
    this.diagnosticoService.getDiagnosticos().subscribe({
      next: (data) => {
        this.listaDiagnosticos = data;
        this.loading = false;
      },
      error: (err) => {
        this.showError('Error al cargar los diagnósticos.');
        this.loading = false;
      }
    });
  }

  guardarDiagnostico(): void {
    if (this.diagnosticoForm.valid) {
      this.loading = true;
      this.diagnosticoService.crearDiagnostico(this.diagnosticoForm.value).subscribe({
        next: (nuevo) => {
          this.listaDiagnosticos.unshift(nuevo);
          this.showSuccess('Diagnóstico territorial registrado correctamente.');
          this.diagnosticoForm.reset();
          this.loading = false;
        },
        error: (err) => {
          this.showError('Error al guardar el diagnóstico.');
          this.loading = false;
        }
      });
    }
  }

  eliminar(id: number | undefined): void {
    if (id !== undefined && confirm('¿Está seguro de eliminar este diagnóstico?')) {
      this.loading = true;
      this.diagnosticoService.eliminarDiagnostico(id).subscribe({
        next: () => {
          this.listaDiagnosticos = this.listaDiagnosticos.filter(d => d.id !== id);
          this.showSuccess('Registro eliminado.');
          this.loading = false;
        },
        error: (err) => {
          this.showError('No se pudo eliminar el registro.');
          this.loading = false;
        }
      });
    }
  }

  private showSuccess(msg: string): void {
    this.successMessage = msg;
    this.errorMessage = '';
    setTimeout(() => this.successMessage = '', 3000);
  }

  private showError(msg: string): void {
    this.errorMessage = msg;
    this.successMessage = '';
    setTimeout(() => this.errorMessage = '', 5000);
  }
}
