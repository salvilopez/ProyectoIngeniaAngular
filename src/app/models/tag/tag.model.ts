import { Expert } from '../expert/expert.model';
import { Itag } from './itag.interface';

export class Tag implements Itag {
  id: number = 0;
  nombre: string;
  expertList: Expert[] = [];
  created_at: Date;
  updated_at: Date;
  creador:string
  constructor(nombre: string,   created_at: Date,creador:string, updated_at: Date,) {
    this.nombre = nombre;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.creador = creador;
  }
}
