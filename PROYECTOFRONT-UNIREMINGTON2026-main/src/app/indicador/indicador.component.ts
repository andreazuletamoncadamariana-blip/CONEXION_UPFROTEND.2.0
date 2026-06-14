import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface IndicadorVisual {
  nombre: string;
  valor: number;
  meta: number;
  unidad: string;
  color: string;
  icono: string;
}

interface Municipio {
  nombre: string;
  lat: number;
  lng: number;
  beneficiarios: number;
  servicio: string;
  color: string;
}

@Component({
  selector: 'app-indicador',
  templateUrl: './indicador.component.html',
  styleUrls: ['./indicador.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class IndicadorComponent implements OnInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  private map: any;

  public indicadores: IndicadorVisual[] = [
    {
      nombre: 'Personas beneficiadas',
      valor: 1250,
      meta: 1600,
      unidad: 'personas',
      color: '#2563eb',
      icono: 'fa-people-group'
    },
    {
      nombre: 'Servicios prestados',
      valor: 3200,
      meta: 4000,
      unidad: 'atenciones',
      color: '#10b981',
      icono: 'fa-hand-holding-heart'
    },
    {
      nombre: 'Jornadas realizadas',
      valor: 28,
      meta: 36,
      unidad: 'jornadas',
      color: '#f59e0b',
      icono: 'fa-calendar-check'
    },
    {
      nombre: 'Municipios impactados',
      valor: 14,
      meta: 20,
      unidad: 'municipios',
      color: '#e30613',
      icono: 'fa-location-dot'
    }
  ];

  public municipios: Municipio[] = [
    { nombre: 'Medellín', lat: 6.2442, lng: -75.5898, beneficiarios: 450, servicio: 'Salud', color: '#2563eb' },
    { nombre: 'Bello', lat: 6.3367, lng: -75.5359, beneficiarios: 280, servicio: 'Veterinaria', color: '#10b981' },
    { nombre: 'Itagüí', lat: 6.1833, lng: -75.6167, beneficiarios: 200, servicio: 'Jurídico', color: '#7c3aed' },
    { nombre: 'Envigado', lat: 6.1667, lng: -75.5333, beneficiarios: 180, servicio: 'Empresarial', color: '#f59e0b' },
    { nombre: 'Sabaneta', lat: 6.1333, lng: -75.5, beneficiarios: 140, servicio: 'Salud', color: '#2563eb' }
  ];

  public areas = [
    { nombre: 'Salud', valor: 82, color: '#2563eb' },
    { nombre: 'Juridica', valor: 68, color: '#7c3aed' },
    { nombre: 'Veterinaria', valor: 91, color: '#10b981' },
    { nombre: 'Ingenieria', valor: 74, color: '#f59e0b' },
    { nombre: 'Empresarial', valor: 61, color: '#e30613' }
  ];

  ngOnInit(): void {
    setTimeout(() => this.initMap(), 500);
  }

  initMap(): void {
    const mapElement = document.getElementById('impact-map');
    if (!mapElement) return;

    this.map = new (window as any).google.maps.Map(mapElement, {
      zoom: 11,
      center: { lat: 6.2442, lng: -75.5898 },
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#f5f7fb' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#102a43' }] },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#0f3d91' }]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#586674' }]
        }
      ]
    });

    // Agregar marcadores con animación
    this.municipios.forEach((municipio, index) => {
      setTimeout(() => {
        const marker = new (window as any).google.maps.Marker({
          position: { lat: municipio.lat, lng: municipio.lng },
          map: this.map,
          title: municipio.nombre,
          animation: (window as any).google.maps.Animation.DROP
        });

        // Info window personalizado
        const infoWindow = new (window as any).google.maps.InfoWindow({
          content: `
            <div style="padding: 12px; font-family: Inter, sans-serif;">
              <strong style="color: #102a43; font-size: 1rem;">${municipio.nombre}</strong>
              <p style="margin: 8px 0 4px; color: #586674; font-size: 0.9rem;">
                <i class="fas fa-users"></i> ${municipio.beneficiarios} beneficiarios
              </p>
              <p style="margin: 4px 0; color: #0f3d91; font-size: 0.9rem; font-weight: 700;">
                ${municipio.servicio}
              </p>
            </div>
          `
        });

        marker.addListener('click', () => infoWindow.open(this.map, marker));
      }, index * 150);
    });
  }

  get totalBeneficiarios(): number {
    return this.indicadores[0].valor;
  }

  get promedioAvance(): number {
    const total = this.indicadores.reduce((sum, indicador) => sum + this.porcentaje(indicador), 0);
    return Math.round(total / this.indicadores.length);
  }

  porcentaje(indicador: IndicadorVisual): number {
    if (!indicador.meta) return 0;
    return Math.min(Math.round((indicador.valor / indicador.meta) * 100), 100);
  }
}
