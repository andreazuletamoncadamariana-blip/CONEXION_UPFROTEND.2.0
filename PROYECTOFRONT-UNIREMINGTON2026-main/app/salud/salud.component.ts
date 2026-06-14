import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaludService } from '../services/salud.services';

@Component({
  selector: 'app-salud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './salud.component.html',
  styleUrls: ['./salud.component.scss']
})
export class SaludComponent implements OnInit {

  // Objeto que coincide con la entidad Java ServicioPrestado
  nuevaAtencion: any = {
    beneficiarioId: null,
    tipoServicio: '',
    facultadResponsable: 'Facultad de Ciencias de la Salud',
    descripcionAtencion: '',
    tiempoAtencion: '',
    resultado: '',
    observaciones: '',
    evidenciasUrl: ''
  };

  listaAtenciones: any[] = [];

  constructor(private saludService: SaludService) { }

  ngOnInit(): void {
    this.obtenerHistorial();
  }

  obtenerHistorial() {
    this.saludService.listarAtenciones().subscribe({
      next: (data: any) => {
        this.listaAtenciones = data;
      },
      error: (err: any) => console.error('Error al cargar historial', err)
    });
  }

  guardarAtencion() {
    this.saludService.guardarAtencion(this.nuevaAtencion).subscribe({
      next: (res: any) => {
        alert('Atención de salud registrada con éxito');
        this.limpiarFormulario();
        this.obtenerHistorial();
      },
      error: (err: any) => {
        console.error('Error al guardar', err);
        alert('Hubo un error al conectar con el servidor');
      }
    });
  }

  eliminar(id: number) {
    if(confirm('¿Está seguro de eliminar este registro?')) {
      // Aquí podrías implementar el método eliminar en tu servicio
      console.log('Eliminando registro:', id);
    }
  }

  limpiarFormulario() {
    this.nuevaAtencion = {
      beneficiarioId: null,
      tipoServicio: '',
      facultadResponsable: 'Facultad de Ciencias de la Salud',
      descripcionAtencion: '',
      tiempoAtencion: '',
      resultado: '',
      observaciones: '',
      evidenciasUrl: ''
    };
  }
}
