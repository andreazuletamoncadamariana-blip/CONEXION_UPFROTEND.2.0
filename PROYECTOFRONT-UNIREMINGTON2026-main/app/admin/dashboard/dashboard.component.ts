import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../../services/estudiante.services';
import { DocenteService } from '../../services/docente.services';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Variables para las métricas
  totalDocentes: number = 0;
  totalEstudiantes: number = 0;

  constructor(
    private router: Router,
    private estudianteService: EstudianteService,
    private docenteService: DocenteService
  ) {}

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  // Método para obtener los datos de la base de datos
  cargarEstadisticas(): void {
    this.estudianteService.listarEstudiantes().subscribe({
      next: (data: any[]) => {
        this.totalEstudiantes = data ? data.length : 0;
      },
      error: (err) => console.error('Error cargando estudiantes', err)
    });

    this.docenteService.listarDocentes().subscribe({
      next: (data: any[]) => {
        this.totalDocentes = data ? data.length : 0;
      },
      error: (err) => console.error('Error cargando docentes', err)
    });
  }

  // Navegación hacia la creación (se vincula con app.routes.ts)
  navegarACrearDocente(): void {
    this.router.navigate(['/admin/docentes'], { queryParams: { crear: 'true' } });
  }

  navegarACrearEstudiante(): void {
    this.router.navigate(['/admin/usuarios'], { queryParams: { crear: 'true' } });
  }

  // Navegación estándar
  navegarA(ruta: string): void {
    this.router.navigate([`/admin/${ruta}`]);
  }

  cerrarSesion(): void {
    if (confirm('¿Está seguro de que desea cerrar sesión?')) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
