import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  usuario = { nombre: '', email: '', password: '', rol: 'ESTUDIANTE' };

  constructor(private http: HttpClient, private router: Router) {}

  registrar() {
    this.http.post('http://localhost:8080/proyectobackenduniremington2026/api/auth/register', this.usuario).subscribe({
      next: () => {
        alert('Registro exitoso. Por favor espera a que un administrador apruebe tu cuenta.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar. Verifica los datos.');
      }
    });
  }
}
