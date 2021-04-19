

export class ExpertRequest {
  limite:number;
  pagina: number;
  nombre: string;
  modalidad: string;
  estado: string;
  etiqueta:any;
  puntuacion: number;

  constructor(limite:number, pagina:number, nombre:string, modalidad:string, estado:string,puntuacion:number){
    this.limite = limite;
    this.pagina = pagina;
    this.nombre = nombre;
    this.modalidad = modalidad;
    this.estado = estado;
    this.puntuacion = puntuacion;
  }

}
