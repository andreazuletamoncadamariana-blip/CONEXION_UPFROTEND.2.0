import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsesoriaEmpresarialService } from '../services/asesoria-empresarial.services';

@Component({
  selector: 'app-asesoria-empresarial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asesoria-empresarial.component.html',
  styleUrls: ['./asesoria-empresarial.component.scss']
})
export class AsesoriaEmpresarialComponent implements OnInit {

  nuevaAsesoria: any = {
    beneficiarioId: null,
    tipoServicio: '',
    facultadResponsable: 'Facultad de Ciencias Empresariales',
    descripcionAtencion: '',
    tiempoAtencion: '',
    resultado: '',
    observaciones: '',
    evidenciasUrl: ''
  };

  listaAsesorias: any[] = [];

  constructor(private empresaService: AsesoriaEmpresarialService) { }

  ngOnInit(): void {
    this.cargarAsesorias();
  }

  cargarAsesorias() {
    this.empresaService.getAsesorias().subscribe({
      next: (data) => this.listaAsesorias = data,
      error: (err) => console.error('Error al cargar datos empresariales', err)
    });
  }

  guardar() {
    this.empresaService.crearAsesoria(this.nuevaAsesoria).subscribe({
      next: () => {
        alert('Asesoría empresarial registrada con éxito');
        this.limpiarFormulario();
        this.cargarAsesorias();
      },
      error: (err) => alert('Error al conectar con el servidor')
    });
  }

  eliminar(id: number) {
    if(confirm('¿Seguro que desea eliminar esta asesoría?')) {
      // Lógica para eliminar
    }
  }

  limpiarFormulario() {
    this.nuevaAsesoria = {
      beneficiarioId: null,
      tipoServicio: '',
      facultadResponsable: 'Facultad de Ciencias Empresariales',
      descripcionAtencion: '',
      tiempoAtencion: '',
      resultado: '',
      observaciones: '',
      evidenciasUrl: ''
    };
  }
}
