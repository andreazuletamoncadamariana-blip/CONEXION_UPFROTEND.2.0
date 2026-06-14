import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DonacionService } from '../../services/donacion.service';

@Component({
  selector: 'app-donacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './donacion.component.html',
  styleUrls: ['./donacion.component.scss']
})
export class DonacionComponent {
  private readonly donacionService = inject(DonacionService);

  mostrarFormulario = false;
  donacion = {
    donante: '',
    correo: '',
    monto: null,
    metodoPago: 'Transferencia',
    comentario: ''
  };

  enviarDonacion() {
    // Validación básica antes de enviar
    if (!this.donacion.donante || !this.donacion.monto || this.donacion.monto <= 0) {
      alert('Por favor, ingresa tu nombre y un monto válido.');
      return;
    }

    this.donacionService.registrarDonacion(this.donacion).subscribe({
      next: (res) => {
        alert('¡Gracias por tu donación! Registro exitoso.');
        this.mostrarFormulario = false;
        this.limpiarFormulario();
      },
      error: (err) => {
        console.error('Error en la conexión:', err);
        alert('Error al conectar con el servidor. Verifica que el backend esté corriendo y que el celular esté en la misma red Wi-Fi que tu PC.');
      }
    });
  }

  limpiarFormulario() {
    this.donacion = { donante: '', correo: '', monto: null, metodoPago: 'Transferencia', comentario: '' };
  }
}
