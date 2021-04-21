import { Tag } from "../tag/tag.model";

export class AddExpert {
  id:number=0;
  nombre:string;
  nif:string;
  contacto_telefono: number;
  contacto_email: string;
  contacto_ciudad: string;
  contacto_linkedin: string;
  disponibilidad: string;
  tagList:Tag[] =[];
  constructor(nombre: string,nif: string,contacto_telefono: number,contacto_email: string,contacto_ciudad: string,contacto_linkedin: string,disponibilidad: string){
      this.nombre= nombre;
      this.nif=nif;
      this.contacto_telefono=contacto_telefono;
      this.contacto_email=contacto_email;
      this.contacto_ciudad=contacto_ciudad;
      this.contacto_linkedin=contacto_linkedin;
      this.disponibilidad=disponibilidad;
  }
}
