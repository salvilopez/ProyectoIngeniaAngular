import { Tag } from '../tag/tag.model';

export interface IExpert {
  id: number;
  nombre: string;
  created_at: Date;
  updated_at: Date;
  estado_motivo: string;
  disponibilidad: string;
  modalidad: string;
  autonomo: boolean;
  contacto_telefono: number;
  contacto_email: string;
  contacto_ciudad: string;
  contacto_linkedin: string;
  condiciones_porcentaje: number;
  condiciones_precio_hora: number;
  puntuacion: number;
  nif: string;
  credenciales_correo: string;
  credenciales_correo_password: string;
  credenciales_zoom: string;
  credenciales_zoom_password: string;
  fichero_foto: string;
  fichero_cv: string;
  observaciones: string;
  origen: string;
  estado: string;
  tagList: Tag[];
}
