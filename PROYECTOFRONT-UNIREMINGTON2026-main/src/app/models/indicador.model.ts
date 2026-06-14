export interface Indicador {
  id?: number;
  nombre: string;
  etiqueta: string;
  descripcion: string;
  valor: number;
  unidad: string;
  tipo: 'cantidad' | 'porcentaje' | 'promedio' | 'ratio';
  meta: number;
}
