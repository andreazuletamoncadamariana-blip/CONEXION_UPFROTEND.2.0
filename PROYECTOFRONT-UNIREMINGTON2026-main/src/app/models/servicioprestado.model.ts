export interface ServicioPrestado {
  id?: number;
  servicio: string;
  facultad: string;
  beneficiario: string;
  documento: string;
  municipio: string;
  fecha: string;
  responsable: string;
  estado: string;
  tipo_servicio: string;
  beneficiario_id: number;
  facultad_responsable: string;
  tipo_atencion: string;
  tiempo_atencion: string;
  descripcion_atencion: string;
  resultado: string;
  observaciones: string;
  evidencias_url: string;
}