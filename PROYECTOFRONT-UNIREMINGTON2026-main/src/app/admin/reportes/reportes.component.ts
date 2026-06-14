import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent {

  filtro = {
    servicio: 'todos',
    inicio: '',
    fin: ''
  };

  formato: 'pdf' | 'excel' = 'pdf';

  generarReporte() {
    console.log('Generando reporte con filtros:', this.filtro);
    console.log('Formato seleccionado:', this.formato);

    // Lógica sugerida:
    // 1. Llamar al servicio correspondiente (ej: SaludService) con los filtros de fecha.
    // 2. Usar una librería como XLSX para Excel o jsPDF para PDF.

    alert(`Preparando archivo ${this.formato.toUpperCase()}... Por favor espere.`);

    setTimeout(() => {
      alert('Reporte generado con éxito. La descarga iniciará automáticamente.');
    }, 2000);
  }
}
