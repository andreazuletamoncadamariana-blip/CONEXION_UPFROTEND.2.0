import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Definimos una interfaz para asegurar la estructura de datos
interface ContactoForm {
  tipoDocumento: string;
  numeroIdentidad: string;
  nombre: string;
  celular: string;
  email: string;
  asunto: string;
  mensaje: string;
}

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent {

  // Estado inicial tipado
  formData: ContactoForm = {
    tipoDocumento: 'CC',
    numeroIdentidad: '',
    nombre: '',
    celular: '',
    email: '',
    asunto: 'Solicitar Jornada',
    mensaje: ''
  };

  mensajeExito: string = '';
  isEnviando: boolean = false; // Útil para deshabilitar el botón mientras envía

  constructor(private http: HttpClient) {}

  enviarMensaje() {
    this.isEnviando = true; // Activa estado de carga

    this.http.post('http://localhost:8080/api/contacto', this.formData)
      .subscribe({
        next: () => {
          this.mensajeExito = '¡Mensaje recibido! Uno de nuestros asesores de Proyección Social se pondrá en contacto contigo muy pronto.';
          this.resetForm();
          this.isEnviando = false;
        },
        error: (err) => {
          console.error('Error:', err);
          alert('Hubo un problema al enviar tu solicitud. Intenta nuevamente.');
          this.isEnviando = false;
        }
      });
  }

  private resetForm() {
    this.formData = {
      tipoDocumento: 'CC',
      numeroIdentidad: '',
      nombre: '',
      celular: '',
      email: '',
      asunto: 'Solicitar Jornada',
      mensaje: ''
    };
  }
}
