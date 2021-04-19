import { Expert } from "../expert/expert.model";

export class TagRequest {
  nombre: string;
  limite:number;
  pagina:number;
  expertList:Expert[]=[]




  constructor(nombre:string,limite:number, pagina:number){
    this.nombre = nombre;
    this.limite = limite;
    this.pagina = pagina;
  }
}

