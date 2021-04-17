

export class ExpertRequest {
  limite:number;
  pagina: number;
  nombre: string;
  modalidad: string;
  estado: string;
  etiqueta:any;

  constructor(limite:number, pagina:number, nombre:string, modalidad:string, estado:string){
    this.limite = limite;
    this.pagina = pagina;
    this.nombre = nombre;
    this.modalidad = modalidad;
    this.estado = estado;
  }

}
