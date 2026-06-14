import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-impacto',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './impacto.component.html',
  styleUrl: './impacto.component.scss'
})
export class ImpactoComponent implements OnInit {
  // Datos de Impacto
  impactoStats = [
    { value: 2847, label: 'Personas Beneficiadas', icon: 'fa-users' },
    { value: 42, label: 'Jornadas Realizadas', icon: 'fa-calendar' },
    { value: 7, label: 'Facultades Participantes', icon: 'fa-school' },
    { value: 500, label: 'Estudiantes Voluntarios', icon: 'fa-handshake' }
  ];

  // Configuración del gráfico de barras - Impacto por Facultad
  impactoBarChartLabels: string[] = ['Ingeniería', 'Salud', 'Derecho', 'Ciencias Económicas', 'Educación', 'Artes y Humanidades', 'Ciencias Básicas'];
  impactoBarChartData: any = {
    labels: this.impactoBarChartLabels,
    datasets: [
      {
        label: 'Personas Beneficiadas',
        data: [450, 380, 290, 310, 275, 220, 250],
        backgroundColor: [
          'rgba(15, 61, 145, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(14, 165, 233, 0.8)'
        ],
        borderColor: [
          '#0f3d91',
          '#ef4444',
          '#f59e0b',
          '#22c55e',
          '#3b82f6',
          '#a855f7',
          '#0ea5e9'
        ],
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: [
          'rgba(15, 61, 145, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(14, 165, 233, 1)'
        ]
      }
    ]
  };

  impactoBarChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#102a43',
          font: {
            size: 13,
            weight: 'bold'
          },
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(16, 42, 67, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#0f3d91',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            return ' ' + context.parsed.y + ' personas beneficiadas';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(16, 42, 67, 0.1)',
          display: true
        },
        ticks: {
          color: '#586674',
          font: {
            size: 12,
            weight: 'bold' as any
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#586674',
          font: {
            size: 12,
            weight: '600' as any
          }
        }
      }
    }
  };

  // Configuración del gráfico de pastel - Distribución de Servicios
  serviciosChartLabels: string[] = ['Salud Comunitaria', 'Asesoría Legal', 'Bienestar Animal', 'Medio Ambiente', 'Asesoría Empresarial', 'Educación Digital'];
  serviciosChartData: any = {
    labels: this.serviciosChartLabels,
    datasets: [
      {
        data: [520, 380, 290, 240, 310, 200],
        backgroundColor: [
          'rgba(239, 68, 68, 0.85)',
          'rgba(245, 158, 11, 0.85)',
          'rgba(34, 197, 94, 0.85)',
          'rgba(59, 130, 246, 0.85)',
          'rgba(168, 85, 247, 0.85)',
          'rgba(14, 165, 233, 0.85)'
        ],
        borderColor: [
          '#ef4444',
          '#f59e0b',
          '#22c55e',
          '#3b82f6',
          '#a855f7',
          '#0ea5e9'
        ],
        borderWidth: 2,
        hoverOffset: 15
      }
    ]
  };

  serviciosChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'right' as any,
        labels: {
          color: '#102a43',
          font: {
            size: 13,
            weight: '600' as any
          },
          padding: 18,
          generateLabels: (chart: any) => {
            const data = chart.data;
            return data.labels.map((label: string, index: number) => ({
              text: label,
              fillStyle: data.datasets[0].backgroundColor[index],
              hidden: false,
              index: index
            }));
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(16, 42, 67, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#0f3d91',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context: any) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((context.parsed / total) * 100);
            return ' ' + context.parsed + ' personas (' + percentage + '%)';
          }
        }
      }
    }
  };

  // Configuración del gráfico de línea - Progreso por mes
  progresoChartLabels: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'];
  progresoChartData: any = {
    labels: this.progresoChartLabels,
    datasets: [
      {
        label: 'Jornadas Realizadas',
        data: [5, 8, 12, 18, 22],
        borderColor: '#0f3d91',
        backgroundColor: 'rgba(15, 61, 145, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#0f3d91',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        hoverBackgroundColor: 'rgba(15, 61, 145, 0.2)'
      },
      {
        label: 'Personas Beneficiadas',
        data: [250, 420, 680, 1200, 1847],
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#22c55e',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        yAxisID: 'y1'
      }
    ]
  };

  progresoChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#102a43',
          font: {
            size: 13,
            weight: 'bold' as any
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(16, 42, 67, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#0f3d91',
        borderWidth: 1,
        padding: 12,
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        type: 'linear',
        position: 'left',
        beginAtZero: true,
        grid: {
          color: 'rgba(16, 42, 67, 0.1)',
          display: true
        },
        ticks: {
          color: '#586674',
          font: {
            size: 12,
            weight: 'bold' as any
          }
        },
        title: {
          display: true,
          text: 'Jornadas',
          color: '#102a43',
          font: {
            size: 12,
            weight: 'bold' as any
          }
        }
      },
      y1: {
        type: 'linear',
        position: 'right',
        beginAtZero: true,
        grid: {
          drawOnChartArea: false
        },
        ticks: {
          color: '#22c55e',
          font: {
            size: 12,
            weight: 'bold' as any
          }
        },
        title: {
          display: true,
          text: 'Personas',
          color: '#22c55e',
          font: {
            size: 12,
            weight: 'bold' as any
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#586674',
          font: {
            size: 12,
            weight: '600' as any
          }
        }
      }
    }
  };

  ngOnInit(): void {}
}
