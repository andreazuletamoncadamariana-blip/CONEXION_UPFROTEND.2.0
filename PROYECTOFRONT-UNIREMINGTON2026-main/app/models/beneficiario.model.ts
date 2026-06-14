export interface Beneficiario {
  id?: number;
  nombre: string;
  correo: string;
  documento: string;
  telefono: string;
  edad: number | null;
  genero: string;
  municipio: string;
  barrio: string;
  poblacion: string;
  servicio: string;
}
