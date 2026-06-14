import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BienestarAnimalService } from '../services/bienestar-animal.services';

@Component({
  selector: 'app-bienestar-animal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bienestar-animal.component.html',
  styleUrls: ['./bienestar-animal.component.scss']
})
export class BienestarAnimalComponent implements OnInit {

  // Estructura exacta que espera la entidad ServicioPrestado en Java
  nuevaAtencion: any = {
    beneficiarioId: null,
    tipoServicio: '',
    facultadResponsable: 'Facultad de Medicina Veterinaria',
    tipoAtencion: '',
    tiempoAtencion: '',
    descripcionAtencion: '',
    resultado: '',
    evidenciasUrl: '',
    fechaSeguimiento: new Date().toISOString().split('T')[0],
    observaciones: ''
  };

  listaAtenciones: any[] = [];

  constructor(private animalService: BienestarAnimalService) { }

  ngOnInit(): void {
    this.cargarHistorial();
  }

  // Se añaden tipos explícitos para evitar errores de TypeScript
  cargarHistorial(): void {
    this.animalService.listar().subscribe({
      next: (data: any[]) => {
        this.listaAtenciones = data;
      },
      error: (err: any) => console.error('Error al cargar historial:', err)
    });
  }

  guardar(): void {
    // Validación de ID del beneficiario
    if (!this.nuevaAtencion.beneficiarioId) {
      alert('Debe ingresar el ID del Propietario / Beneficiario');
      return;
    }

    // Convertimos el ID a número para evitar Error 400 en el Backend
    const datosParaEnviar = {
      ...this.nuevaAtencion,
      beneficiario: {
        id: parseInt(this.nuevaAtencion.beneficiarioId.toString(), 10)
      }
    };

    this.animalService.crear(datosParaEnviar).subscribe({
      next: (res: any) => {
        alert('¡Atención veterinaria registrada con éxito!');
        this.limpiarFormulario();
        this.cargarHistorial(); // Refresca la tabla automáticamente
      },
      error: (err: any) => {
        console.error('Error del servidor:', err);
        // Error común: El ID no existe en la tabla 'beneficiarios'
        alert('Error al guardar. Verifique que el ID del beneficiario exista en la base de datos.');
      }
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que desea eliminar esta atención?')) {
      this.animalService.eliminar(id).subscribe({
        next: () => {
          alert('Atención eliminada correctamente');
          this.cargarHistorial();
        },
        error: (err: any) => console.error('Error al eliminar:', err)
      });
    }
  }

  limpiarFormulario(): void {
    this.nuevaAtencion = {
      beneficiarioId: null,
      tipoServicio: '',
      facultadResponsable: 'Facultad de Medicina Veterinaria',
      tipoAtencion: '',
      tiempoAtencion: '',
      descripcionAtencion: '',
      resultado: '',
      evidenciasUrl: '',
      fechaSeguimiento: new Date().toISOString().split('T')[0],
      observaciones: ''
    };
  }
}
