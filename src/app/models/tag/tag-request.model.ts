import { Expert } from "../expert/expert.model";

export class TagRequest {
  nombre: string;
  limite:number;
  pagina:number;
  creador:string;
  fechaCreacion:Date;
  expertList:Expert[]=[]




  constructor(nombre:string,limite:number, pagina:number,creador:string,fechaCreacion:Date){
    this.nombre = nombre;
    this.limite = limite;
    this.pagina = pagina;
    this.creador = creador;
    this.fechaCreacion=fechaCreacion;
  }
}

