import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consultoria-contable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultoria-contable.component.html',
  styleUrls: ['./consultoria-contable.component.scss']
})
export class ConsultoriaContableComponent {
  title = 'Consultorio Contable';

  servicios = [
    {
      icon: 'fa-solid fa-calculator',
      title: 'Asesoría contable',
      text: 'Orientación para registros, estados y buenas prácticas contables.'
    },
    {
      icon: 'fa-solid fa-file-invoice-dollar',
      title: 'Declaraciones',
      text: 'Acompañamiento para la preparación y revisión de declaraciones.'
    },
    {
      icon: 'fa-solid fa-hand-holding-hand',
      title: 'Apoyo a emprendedores',
      text: 'Soluciones claras para fortalecer la gestión financiera y la toma de decisiones.'
    }
  ];
}

