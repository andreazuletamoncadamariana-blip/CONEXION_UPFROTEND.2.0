export interface ServicioPrestado {
  id?: number; // El '?' evita errores de tipado estricto en inserciones
  servicio: string;
  facultad: string;
  beneficiario: string;
  documento: string;
  municipio: string;
  fecha: string;
  responsable: string;
  estado: string;
  observaciones?: string;
}
