import { Routes } from '@angular/router';

// Componentes de páginas principales
import { HomeComponent } from './home/home.component';
import { BeneficiarioComponent } from './beneficiario/beneficiario.component';
import { IndicadorComponent } from './indicador/indicador.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';

// Brigadas
import { SaludComponent } from './salud/salud.component';
import { BienestarAnimalComponent } from './bienestar-animal/bienestar-animal.component';
import { IngenieriaAmbienteComponent } from './ingenieria-ambiente/ingenieria-ambiente.component';
import { AsesoriaEmpresarialComponent } from './asesoria-empresarial/asesoria-empresarial.component';
import { BrigadaJuridicaComponent } from './brigada-juridica/brigada-juridica.component';
import { DisenoImagenComponent } from './diseno-imagen/diseno-imagen.component';
import { ConsultoriaContableComponent } from './consultoria-contable/consultoria-contable.component';

// Páginas independientes
import { ImpactoComponent } from './pages/impacto/impacto.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { GameComponent } from './pages/game/game.component';
import { BlogComponent } from './pages/blog/blog.component';
import { SolicitudJornadaComponent } from './components/solicitud-jornada/solicitud-jornada.component';

// Autenticación
import { LoginComponent } from './components/auth/login/login.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { authGuard } from './guards/auth.guard';

// Administración
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { EstudiantesComponent } from './admin/estudiantes/estudiantes.component';
import { ReportesComponent } from './admin/reportes/reportes.component';
import { DocentesComponent } from './admin/docentes/docentes.component';


export const routes: Routes = [
  // 1. RUTAS PÚBLICAS
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'impacto', component: ImpactoComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'remi-game', component: GameComponent },
  { path: 'solicitar-jornada', component: SolicitudJornadaComponent },

  // 2. RUTAS PROTEGIDAS (Requieren Login)
  {
    path: 'beneficiarios',
    component: BeneficiarioComponent,
    canActivate: [authGuard],
    data: { roles: ['admin', 'docente'] }
  },
  {
    path: 'indicadores',
    component: IndicadorComponent,
    canActivate: [authGuard],
    data: { roles: ['admin', 'docente'] }
  },
  {
    path: 'seguimientos',
    component: SeguimientoComponent,
    canActivate: [authGuard],
    data: { roles: ['admin', 'docente'] }
  },
  {
    path: 'servicios-prestados',
    loadComponent: () => import('./servicioprestado/servicioprestado.component').then((m) => m.ServicioPrestadoComponent),
    canActivate: [authGuard],
    data: { roles: ['admin', 'docente', 'estudiante'] }
  },

  // Brigadas
  { path: 'salud', component: SaludComponent, canActivate: [authGuard], data: { roles: ['admin', 'docente'] } },
  { path: 'bienestar-animal', component: BienestarAnimalComponent, canActivate: [authGuard], data: { roles: ['admin', 'docente'] } },
  { path: 'brigada-juridica', component: BrigadaJuridicaComponent, canActivate: [authGuard], data: { roles: ['admin', 'docente'] } },
  { path: 'ingenieria-ambiente', component: IngenieriaAmbienteComponent, canActivate: [authGuard], data: { roles: ['admin', 'docente'] } },
  { path: 'asesorias-empresariales', component: AsesoriaEmpresarialComponent, canActivate: [authGuard], data: { roles: ['admin', 'docente'] } },
  { path: 'diseno-imagen', component: DisenoImagenComponent, canActivate: [authGuard], data: { roles: ['admin', 'docente'] } },
  { path: 'consultoria-contable', component: ConsultoriaContableComponent, canActivate: [authGuard], data: { roles: ['admin', 'docente'] } },

  // 3. MÓDULO ADMINISTRACIÓN
  {
    path: 'admin',
    canActivate: [authGuard],
    data: { roles: ['admin'] },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'blog', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'usuarios', component: EstudiantesComponent },
      { path: 'docentes', component: DocentesComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // 4. REDIRECCIONES
  { path: 'admin-dashboard', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  { path: 'admin/blog', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  { path: 'docente', redirectTo: 'beneficiarios', pathMatch: 'full' },
  { path: 'estudiantes', redirectTo: 'servicios-prestados', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' } // Ruta de comodín para manejo de errores 404
];
