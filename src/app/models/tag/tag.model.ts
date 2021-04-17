import { Expert } from '../expert/expert.model';
import { Itag } from './itag.interface';

export class Tag implements Itag {
  id: number = 0;
  nombre: string;
  tagList: Expert[] = [];
  constructor(nombre: string) {
    this.nombre = nombre;
  }
}
