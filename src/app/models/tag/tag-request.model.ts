export class TagRequest {
  nombre: string;
  limite:number;
  pagina:number;




  constructor(nombre:string,limite:number, pagina:number){
    this.nombre = nombre;
    this.limite = limite;
    this.pagina = pagina;
  }
}

