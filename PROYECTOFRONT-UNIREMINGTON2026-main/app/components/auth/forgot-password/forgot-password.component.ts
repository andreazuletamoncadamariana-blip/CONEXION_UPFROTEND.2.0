import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Inicializa el formulario reactivo con validaciones
   */
  private initializeForm(): void {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /**
   * Verifica si el email es inválido y ha sido tocado
   */
  isEmailInvalid(): boolean {
    const emailControl = this.resetForm.get('email');
    return emailControl ? emailControl.invalid && emailControl.touched : false;
  }

  /**
   * Maneja el envío del formulario de recuperación de contraseña
   */
  onReset(event: Event): void {
    event.preventDefault();

    // Limpiar mensajes previos
    this.successMessage = null;
    this.errorMessage = null;

    // Validar formulario
    if (this.resetForm.invalid) {
      this.errorMessage = 'Por favor completa el formulario correctamente';
      return;
    }

    this.isLoading = true;
    const email = this.resetForm.get('email')?.value;

    // Aquí irá la lógica de envío del correo de recuperación
    // Por ahora, simulamos la respuesta
    setTimeout(() => {
      this.isLoading = false;
      this.successMessage = `Hemos enviado un enlace de recuperación a ${email}. Revisa tu bandeja de entrada.`;
      this.resetForm.reset();
    }, 1500);

    // Ejemplo de integración con un servicio real:
    // this.authService.sendPasswordReset(email).subscribe(
    //   response => {
    //     this.isLoading = false;
    //     this.successMessage = `Hemos enviado un enlace de recuperación a ${email}. Revisa tu bandeja de entrada.`;
    //     this.resetForm.reset();
    //   },
    //   error => {
    //     this.isLoading = false;
    //     this.errorMessage = error.message || 'Ocurrió un error al enviar el correo. Intenta de nuevo.';
    //   }
    // );
  }
}
