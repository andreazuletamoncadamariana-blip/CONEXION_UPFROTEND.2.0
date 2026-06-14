// src/app/seguimiento/seguimiento.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { SeguimientoService } from '../services/seguimiento.services';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Seguimiento } from '../models/seguimiento.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seguimiento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './seguimiento.component.html',
  styleUrl: './seguimiento.component.css'
})
export class SeguimientoComponent implements OnInit {
  listaSeguimientos: Seguimiento[] = [];
  filtroDocumento: string = '';
  nombreBeneficiario: string = '';
  beneficiarioId: number | null = null;
  error: string = '';
  loading: boolean = false;
  public mostrarFormulario: boolean = false;
  formularioSeguimiento: FormGroup;

  private seguimientoService = inject(SeguimientoService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    this.formularioSeguimiento = this.fb.group({
      fecha: ['', Validators.required],
      observacion: ['', Validators.required],
      estado: ['', Validators.required],
      beneficiarioId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarTodosLosSeguimientos();
    // Detectamos si venimos del Dashboard con la intención de crear
    this.route.queryParams.subscribe(params => {
      if (params['mode'] === 'create') {
        this.mostrarFormulario = true;
        // Limpiamos los parámetros para mantener una navegación coherente
        this.router.navigate([], { queryParams: { mode: null }, queryParamsHandling: 'merge' });
      }
    });
  }

  cargarTodosLosSeguimientos() {
    this.loading = true;
    this.error = '';
    this.seguimientoService.getSeguimientos().subscribe({
      next: (data: Seguimiento[]) => {
        this.listaSeguimientos = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'No se pudieron cargar los seguimientos.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  /**
   * Buscar seguimientos por documento del beneficiario
   */
  buscarPorDocumento() {
    if (!this.filtroDocumento.trim()) {
      this.error = 'Por favor ingresa un documento para buscar';
      return;
    }

    this.loading = true;
    this.error = '';

    // Obtenemos los datos frescos antes de filtrar para no perder información
    // en búsquedas consecutivas.
    this.seguimientoService.getSeguimientos().subscribe({
      next: (data: Seguimiento[]) => {
        this.listaSeguimientos = data.filter(seg =>
          seg.beneficiarioId?.toString().includes(this.filtroDocumento)
        );
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al realizar la búsqueda.';
        this.loading = false;
      }
    });
  }

  limpiarBusqueda() {
    this.filtroDocumento = '';
    this.nombreBeneficiario = '';
    this.beneficiarioId = null;
    this.formularioSeguimiento.patchValue({ beneficiarioId: null });
    this.cargarTodosLosSeguimientos();
  }

  guardarSeguimiento() {
    if (this.formularioSeguimiento.invalid) {
      this.error = 'Por favor completa todos los campos requeridos';
      return;
    }

    const nuevoSeguimiento = this.formularioSeguimiento.value as Seguimiento;

    this.seguimientoService.crearSeguimiento(nuevoSeguimiento).subscribe({
      next: (data: Seguimiento) => {
        this.listaSeguimientos.push(data);
        this.limpiarFormulario();
        this.mostrarFormulario = false;
        this.error = '';
      },
      error: (err: any) => {
        this.error = 'Error al guardar el seguimiento';
        console.error(err);
      }
    });
  }

  limpiarFormulario() {
    this.formularioSeguimiento.reset({
      fecha: '',
      observacion: '',
      estado: '',
      beneficiarioId: this.beneficiarioId || null
    });
  }

  cancelar() {
    this.mostrarFormulario = false;
    this.limpiarFormulario();
  }
}
