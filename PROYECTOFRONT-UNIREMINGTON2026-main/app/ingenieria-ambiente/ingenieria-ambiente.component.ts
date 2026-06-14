import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IngenieriaAmbienteService } from '../services/ingenieria-ambiente.services';

@Component({
  selector: 'app-ingenieria-ambiente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ingenieria-ambiente.component.html',
  styleUrls: ['./ingenieria-ambiente.component.scss']
})
export class IngenieriaAmbienteComponent implements OnInit {

  nuevoRegistro: any = {
    beneficiarioId: null,
    tipoServicio: '',
    facultadResponsable: 'Facultad de Ingeniería',
    descripcionAtencion: '',
    tiempoAtencion: '',
    resultado: '',
    observaciones: '',
    evidenciasUrl: ''
  };

  listaRegistros: any[] = [];

  constructor(private ingenieriaService: IngenieriaAmbienteService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.ingenieriaService.listarProyectos().subscribe({
      next: (data) => this.listaRegistros = data,
      error: (err) => console.error('Error al listar asesorías', err)
    });
  }

  guardar() {
    this.ingenieriaService.registrarConsulta(this.nuevoRegistro).subscribe({
      next: () => {
        alert('Asesoría técnica registrada correctamente');
        this.limpiarFormulario();
        this.listar();
      },
      error: (err) => alert('Error al conectar con el servidor de ingeniería')
    });
  }

  eliminar(id: number) {
    if(confirm('¿Desea borrar este registro técnico?')) {
      // Implementar eliminar en servicio si es necesario
    }
  }

  limpiarFormulario() {
    this.nuevoRegistro = {
      beneficiarioId: null,
      tipoServicio: '',
      facultadResponsable: 'Facultad de Ingeniería',
      descripcionAtencion: '',
      tiempoAtencion: '',
      resultado: '',
      observaciones: '',
      evidenciasUrl: ''
    };
  }
}
