import { Expert } from '../expert/expert.model';

export interface Itag {
  id: number;
  nombre: string;
  expertList: Expert[];
}
