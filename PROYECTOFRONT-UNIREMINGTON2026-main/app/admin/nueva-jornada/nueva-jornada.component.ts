import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nueva-jornada',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nueva-jornada.component.html',
  styleUrls: ['./nueva-jornada.component.scss']
})
export class NuevaJornadaComponent {
  @Output() cerrar = new EventEmitter<void>();

  // Inicializamos el objeto para evitar errores de compilación
  public jornada = {
    municipio: '',
    responsable: '',
    fecha: '',
    facultad: 'Derecho'
  };

  guardar() {
    console.log('Jornada guardada!', this.jornada);
    this.cerrar.emit();
  }
}
