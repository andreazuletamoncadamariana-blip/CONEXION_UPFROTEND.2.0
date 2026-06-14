import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicioPrestadoService } from '../services/servicioprestado.services';

interface ChatMessage {
  role: 'assistant' | 'user';
  text: string;
}

@Component({
  selector: 'app-servicioprestado',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './servicioprestado.component.html',
  styleUrls: ['./servicioprestado.component.scss']
})
export class ServicioPrestadoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  preguntaIA = '';
  isThinking = false;
  segundos = 0;
  intervalo: ReturnType<typeof setInterval> | null = null;

  facultades = [
    'Ingenieria',
    'Ciencias Administrativas',
    'Ciencias Juridicas',
    'Ciencias Basicas',
    'Ciencias Sociales',
    'Ciencias de la Salud',
    'Educacion'
  ];

  preguntasRapidas = [
    'Como lleno el formulario?',
    'Que facultades puedo registrar?',
    'Como uso el tiempo de atencion?',
    'Cuando puedo guardar el registro?'
  ];

  chatMessages: ChatMessage[] = [
    {
      role: 'assistant',
      text: 'Hola, soy el asistente virtual de Servicios Prestados. Preguntame sobre el formulario, facultades, tiempo de atencion o como guardar un registro.'
    }
  ];

  constructor(private fb: FormBuilder, private services: ServicioPrestadoService) {
    this.form = this.fb.group({
      facultad: ['', Validators.required],
      servicio: ['', Validators.required],
      beneficiario: ['', Validators.required],
      documento: ['', Validators.required],
      departamento: ['', Validators.required],
      municipio: ['', Validators.required],
      vereda: ['', Validators.required],
      barrio: ['', Validators.required],
      contacto: ['', Validators.required],
      fecha: ['', Validators.required],
      tiempo_atencion: ['00:00']
    });
  }

  ngOnInit(): void {}

  consultarIA(pregunta?: string): void {
    const textoPregunta = (pregunta ?? this.preguntaIA).trim();

    if (!textoPregunta) {
      return;
    }

    this.chatMessages.push({ role: 'user', text: textoPregunta });
    this.preguntaIA = '';
    this.isThinking = true;

    setTimeout(() => {
      this.chatMessages.push({ role: 'assistant', text: this.generarRespuestaIA(textoPregunta) });
      this.isThinking = false;
    }, 250);
  }

  iniciarCronometro(): void {
    if (this.intervalo) {
      return;
    }

    this.intervalo = setInterval(() => this.segundos++, 1000);
  }

  finalizarCronometro(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = null;
    }

    const m = Math.floor(this.segundos / 60);
    const s = this.segundos % 60;
    this.form.patchValue({ tiempo_atencion: `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` });
    this.segundos = 0;
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.chatMessages.push({
        role: 'assistant',
        text: 'Antes de guardar, completa todos los campos obligatorios del formulario.'
      });
      return;
    }

    this.services.crear(this.form.value).subscribe(() => {
      alert('Guardado');
      this.form.reset({ tiempo_atencion: '00:00' });
    });
  }

  ngOnDestroy(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  private generarRespuestaIA(pregunta: string): string {
    const p = pregunta.toLowerCase();

    if (this.contiene(p, ['llenar', 'formulario', 'registro', 'campos'])) {
      return 'Para llenar el formulario, selecciona la facultad, escribe el servicio prestado, registra el beneficiario con documento, agrega ubicacion, contacto y fecha. Cuando todos los campos obligatorios esten completos, puedes guardar el registro.';
    }

    if (this.contiene(p, ['facultad', 'facultades'])) {
      return `Puedes registrar servicios de estas facultades: ${this.facultades.join(', ')}. Elige la que sea responsable del servicio realizado.`;
    }

    if (this.contiene(p, ['tiempo', 'cronometro', 'atencion', 'duracion'])) {
      return 'El tiempo de atencion sirve para medir cuanto duro el servicio. Pulsa Iniciar al comenzar la atencion y Finalizar al terminar; el sistema guarda el tiempo en formato minutos y segundos.';
    }

    if (this.contiene(p, ['guardar', 'enviar', 'validar', 'obligatorio'])) {
      return 'Puedes guardar cuando el formulario este completo. Si falta un dato obligatorio, revisa los campos vacios y completa la informacion antes de enviar.';
    }

    if (this.contiene(p, ['beneficiario', 'documento', 'contacto'])) {
      return 'El beneficiario es la persona o comunidad atendida. Registra nombre completo, documento y un contacto valido para que el servicio pueda verificarse o recibir seguimiento.';
    }

    if (this.contiene(p, ['departamento', 'municipio', 'vereda', 'barrio', 'ubicacion'])) {
      return 'La ubicacion permite identificar donde se realizo el servicio. Escribe departamento, municipio y, si aplica, vereda o barrio con la mayor precision posible.';
    }

    if (this.contiene(p, ['hola', 'buenas', 'ayuda'])) {
      return 'Claro, estoy aqui para ayudarte. Puedes preguntarme como llenar el formulario, que facultad seleccionar, como medir el tiempo o cuando guardar el registro.';
    }

    return 'Te puedo orientar sobre el registro de servicios prestados. Reformula tu pregunta indicando si necesitas ayuda con facultad, beneficiario, ubicacion, tiempo de atencion o guardado del formulario.';
  }

  private contiene(texto: string, claves: string[]): boolean {
    return claves.some((clave) => texto.includes(clave));
  }
}
