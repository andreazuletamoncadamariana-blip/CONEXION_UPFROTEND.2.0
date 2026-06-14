import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrigadaJuridicaService } from '../services/brigada-juridica.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brigada-juridica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './brigada-juridica.component.html',
  styleUrls: ['./brigada-juridica.component.scss']
})
export class BrigadaJuridicaComponent implements OnInit {

  public mostrarFormulario: boolean = false;

  // Objeto estructurado según la entidad ServicioPrestado de Java
  nuevaAsesoria: any = {
    beneficiario: { id: null }, // ID que se ingresa en el formulario
    tipoServicio: 'Brigada Jurídica', // Identificador para la tabla maestra
    facultadResponsable: 'Facultad de Derecho',
    tipoAtencion: '', // Áre del Derecho
    fechaSeguimiento: new Date().toISOString().split('T')[0],
    descripcionAtencion: '', // Resumen del Caso
    resultado: '', // Acción Sugerida
    observaciones: '', // Estado Actual
    tiempoAtencion: 'N/A',
    evidenciasUrl: ''
  };

  listaAsesorias: any[] = [];

  constructor(private juridicoService: BrigadaJuridicaService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCasos();
    // Lógica para desplegar creación desde el dashboard
    this.route.queryParams.subscribe(params => {
      if (params['mode'] === 'create') {
        this.mostrarFormulario = true;
      }
    });
  }

  // Carga solo los registros que pertenecen a Brigada Jurídica
  cargarCasos(): void {
    this.juridicoService.listarCasos().subscribe({
      next: (data) => {
        this.listaAsesorias = data;
      },
      error: (err: any) => console.error('Error al cargar historial:', err)
    });
  }

  guardar(): void {
    // 1. Validación básica de ID
    if (!this.nuevaAsesoria.beneficiario.id) {
      alert('Por favor, ingrese el ID del Ciudadano / Beneficiario');
      return;
    }

    // 2. Preparación de los datos (Asegurar formato JSON correcto para JPA)
    const datosParaEnviar = {
      ...this.nuevaAsesoria,
      beneficiario: {
        id: parseInt(this.nuevaAsesoria.beneficiario.id.toString())
      }
    };

    console.log('Enviando datos al Backend:', datosParaEnviar);

    // 3. Llamada al servicio
    this.juridicoService.registrarCaso(datosParaEnviar).subscribe({
      next: (res) => {
        alert('¡Caso registrado con éxito en la Tabla Maestra!');
        this.limpiarFormulario();
        this.cargarCasos(); // Actualiza la tabla inferior
      },
      error: (err: any) => {
        console.error('Error 400/500 del servidor:', err);
        // Comúnmente el error es porque el ID del beneficiario no existe en MySQL
        alert('Error al guardar: Verifique que el ID del ciudadano exista en el sistema.');
      }
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Desea eliminar este registro permanentemente?')) {
      this.juridicoService.eliminarCaso(id).subscribe({
        next: () => {
          alert('Registro eliminado correctamente');
          this.cargarCasos();
        },
        error: (err: any) => console.error('Error al eliminar:', err)
      });
    }
  }

  limpiarFormulario(): void {
    this.nuevaAsesoria = {
      beneficiario: { id: null },
      tipoServicio: 'Brigada Jurídica',
      facultadResponsable: 'Facultad de Derecho',
      tipoAtencion: '',
      fechaSeguimiento: new Date().toISOString().split('T')[0],
      descripcionAtencion: '',
      resultado: '',
      observaciones: '',
      tiempoAtencion: 'N/A',
      evidenciasUrl: ''
    };
    this.mostrarFormulario = false;
  }
}
