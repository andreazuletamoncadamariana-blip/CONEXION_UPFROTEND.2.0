import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diseno-imagen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diseno-imagen.component.html',
  styleUrls: ['./diseno-imagen.component.scss']
})
export class DisenoImagenComponent {
  title = 'Diseño e Imagen Corporativa';

  cards = [
    {
      icon: 'fa-solid fa-palette',
      title: 'Identidad visual',
      text: 'Construcción de logos, paletas y piezas gráficas alineadas a la necesidad del emprendimiento o institución.'
    },
    {
      icon: 'fa-solid fa-image',
      title: 'Material de comunicación',
      text: 'Plantillas para redes, banners y formatos listos para publicación con enfoque social y educativo.'
    },
    {
      icon: 'fa-solid fa-bolt',
      title: 'Acompañamiento',
      text: 'Orientación para implementar la imagen corporativa de forma clara, coherente y medible.'
    }
  ];
}

