export interface Docente {
  id?: number;
  nombre: string;
  apellido: string;
  documento: string;
  correoInstitucional: string;
  contrasenaAcceso: string;
  email?: string;
  password?: string;
  facultad: string;
  especialidad: string;
  estado: string;
}
