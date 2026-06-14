import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../user.service';

interface UsuarioLogin {
  nombre?: string;
  apellido?: string;
  email?: string;
  facultad?: string;
  especialidad?: string;
  role?: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = { user: '', pass: '' };

  constructor(private router: Router, private userService: UserService) {}

  onLogin(event: Event) {
    event.preventDefault();
    const email = this.loginData.user.trim().toLowerCase();
    const pass = this.loginData.pass.trim();

    if (!email || !pass) {
      alert('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    // ACCESO DE EMERGENCIA (Bypass para Admin 123)
    if (email === 'admin' && pass === '123') {
      this.guardarSesion('admin', email, { nombre: 'Administrador', apellido: 'General' });
      this.router.navigate(['/admin/dashboard']);
      return;
    }

    // AUTENTICACIÓN REAL
    this.userService.login({ email, pass }).subscribe({
      next: (userData: any) => {
        const role = (userData.role || 'estudiante').toLowerCase().trim();
        this.guardarSesion(role, email, userData);

        if (role === 'admin' || role === 'administrador') this.router.navigate(['/admin/dashboard']);
        else if (role === 'docente') this.router.navigate(['/docente']);
        else this.router.navigate(['/estudiantes']);
      },
      error: () => alert('Credenciales inválidas o error de servidor.')
    });
  }

  private guardarSesion(role: string, email: string, usuario?: UsuarioLogin): void {
    const nombre = usuario ? `${usuario.nombre || ''} ${usuario.apellido || ''}`.trim() : email;
    localStorage.setItem('user_session', 'true');
    localStorage.setItem('user_role', role);
    localStorage.setItem('user_email', email);
    localStorage.setItem('user_name', nombre);
  }
}
