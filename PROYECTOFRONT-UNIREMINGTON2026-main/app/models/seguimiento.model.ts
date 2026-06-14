export interface Seguimiento {
  id?: number;
  fecha: string;
  observacion: string;
  estado: string;
  beneficiarioId: number | null;
}
