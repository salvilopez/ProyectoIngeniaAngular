import { Tag } from "../tag/tag.model";

export class ExpertTable {
  nombre: string;
  etiquetas: Tag[]=[];
  estado: string;
  valoracion:number;

constructor(nombre: string, estado: string, valoracion:number,etiquetas:Tag[]){
  this.nombre = nombre;
  this.estado = estado;
  this.valoracion = valoracion;
  this.etiquetas=etiquetas;
}
}
