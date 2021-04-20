import { Tag } from '../tag/tag.model';
import { IExpert } from './iexpert.interface';

export class Expert implements IExpert {
  id: number = 0;
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
  tagList: Tag[] = [];
  constructor(
    nombre: string,
    created_at: Date,
    updated_at: Date,
    estado_motivo: string,
    disponibilidad: string,
    modalidad: string,
    autonomo: boolean,
    contacto_telefono: number,
    contacto_email: string,
    contacto_ciudad: string,
    contacto_linkedin: string,
    condiciones_porcentaje: number,
    condiciones_precio_hora: number,
    puntuacion: number,
    nif: string,
    credenciales_correo: string,
    credenciales_correo_password: string,
    credenciales_zoom: string,
    credenciales_zoom_password: string,
    fichero_foto: string,
    fichero_cv: string,
    observaciones: string,
    origen: string,
    estado: string
  ) {
this.nombre=nombre;
this.created_at=created_at;
this.updated_at= updated_at;
this.estado_motivo= estado_motivo;
this.disponibilidad= disponibilidad;
this.modalidad= modalidad;
this.autonomo= autonomo;
this.contacto_telefono= contacto_telefono;
this.contacto_email= contacto_email;
this.contacto_ciudad= contacto_ciudad;
this.contacto_linkedin= contacto_linkedin;
this.condiciones_porcentaje= condiciones_porcentaje;
this.condiciones_precio_hora= condiciones_precio_hora;
this.puntuacion= puntuacion;
this.nif= nif;
this.credenciales_correo= credenciales_correo;
this.credenciales_correo_password= credenciales_correo_password;
this.credenciales_zoom= credenciales_zoom;
this.credenciales_zoom_password= credenciales_zoom_password;
this.fichero_foto= fichero_foto;
this.fichero_cv= fichero_cv;
this.observaciones=observaciones;
this.origen= origen;
this.estado= estado;
  }

}
