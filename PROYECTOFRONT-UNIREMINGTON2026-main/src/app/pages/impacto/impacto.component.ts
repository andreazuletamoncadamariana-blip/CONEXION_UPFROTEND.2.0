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
  private counterStarted = false;

  scrollToGrafico(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Datos de Impacto
  impactoStats = [
    { value: 200, currentValue: 0, label: 'Personas atendidas', icon: 'fa-users' },
    { value: 2, currentValue: 0, label: 'Municipios impactados', icon: 'fa-location-dot' },
    { value: 7, currentValue: 0, label: 'Facultades y areas vinculadas', icon: 'fa-school' },
    { value: 160, currentValue: 0, label: 'Animales atendidos', icon: 'fa-paw' }
  ];

  facultyImpact = [
    { label: 'Medicina Veterinaria', shortLabel: 'Veter.', value: 160, color: 'linear-gradient(180deg, #16a085, #22c55e)' },
    { label: 'Ciencias de la Salud', shortLabel: 'Salud', value: 57, color: 'linear-gradient(180deg, #ef4444, #f97316)' },
    { label: 'Ciencias Juridicas y Politicas', shortLabel: 'Jurid.', value: 19, color: 'linear-gradient(180deg, #f59e0b, #facc15)' },
    { label: 'Ciencias Contables', shortLabel: 'Cont.', value: 1, color: 'linear-gradient(180deg, #0f3d91, #2563eb)' },
    { label: 'Ciencias Empresariales', shortLabel: 'Emp.', value: 1, color: 'linear-gradient(180deg, #7c3aed, #c084fc)' },
    { label: 'Ingenierias', shortLabel: 'Ing.', value: 1, color: 'linear-gradient(180deg, #0ea5e9, #38bdf8)' },
    { label: 'Diseno', shortLabel: 'Diseno', value: 0, color: 'linear-gradient(180deg, #64748b, #94a3b8)' }
  ];

  serviceDistribution = [
    { label: 'Atencion animal', value: 160, color: '#22c55e' },
    { label: 'Salud humana', value: 57, color: '#ef4444' },
    { label: 'Asesoria juridica', value: 19, color: '#f59e0b' },
    { label: 'Consultorio contable', value: 1, color: '#3b82f6' },
    { label: 'Consultorio empresarial', value: 1, color: '#a855f7' },
    { label: 'Robotica e ingenieria', value: 1, color: '#0ea5e9' }
  ];

  monthlyProgress = [
    { month: '27 Sep', jornadas: 1, personas: 100 },
    { month: '28 Sep', jornadas: 2, personas: 200 }
  ];

  get maxFacultyImpact(): number {
    return Math.max(...this.facultyImpact.map(item => item.value));
  }

  get totalServices(): number {
    return this.serviceDistribution.reduce((total, item) => total + item.value, 0);
  }

  get maxMonthlyPeople(): number {
    return Math.max(...this.monthlyProgress.map(item => item.personas));
  }

  get maxMonthlyJornadas(): number {
    return Math.max(...this.monthlyProgress.map(item => item.jornadas));
  }

  get donutGradient(): string {
    let current = 0;
    const segments = this.serviceDistribution.map(item => {
      const start = current;
      const end = current + (item.value / this.totalServices) * 100;
      current = end;
      return `${item.color} ${start}% ${end}%`;
    });
    return `conic-gradient(${segments.join(', ')})`;
  }

  getBarHeight(value: number): number {
    if (value === 0) {
      return 3;
    }
    return Math.max((value / this.maxFacultyImpact) * 100, 10);
  }

  getServicePercentage(value: number): number {
    return Math.round((value / this.totalServices) * 100);
  }

  getPointX(index: number): number {
    const step = 460 / (this.monthlyProgress.length - 1);
    return 40 + index * step;
  }

  getPointY(value: number, max: number): number {
    return 230 - (value / max) * 200;
  }

  getLinePoints(type: 'personas' | 'jornadas'): string {
    const max = type === 'personas' ? this.maxMonthlyPeople : this.maxMonthlyJornadas;
    return this.monthlyProgress
      .map((point, index) => `${this.getPointX(index)},${this.getPointY(point[type], max)}`)
      .join(' ');
  }

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

  ngOnInit(): void {
    this.startCounters();
  }

  formatCounter(value: number): string {
    return new Intl.NumberFormat('es-CO').format(value);
  }

  private startCounters(): void {
    if (this.counterStarted) {
      return;
    }
    this.counterStarted = true;

    const duration = 1800;
    const start = performance.now();

    const animate = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      this.impactoStats = this.impactoStats.map(stat => ({
        ...stat,
        currentValue: Math.round(stat.value * easedProgress)
      }));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}
