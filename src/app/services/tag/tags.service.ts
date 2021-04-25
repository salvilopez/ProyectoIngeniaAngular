import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TagRequest } from 'src/app/models/tag/tag-request.model';
import { Tag } from 'src/app/models/tag/tag.model';
@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) { }

/**
 * Metodo ctrear tags
 * @param tag
 * @returns Tag
 */
  createTags(tag:Tag): Observable<Tag> {

   return this.http.post<Tag>('https://proyectofinal-ingenia.herokuapp.com/api/etiquetas',tag);
  }

/**
 * Metodo borrar tags
 * @param idTag
 * @returns Tag borrada
 */
  deleteTag(idTag:number): Observable<Tag> {

    return this.http.delete<Tag>('https://proyectofinal-ingenia.herokuapp.com/api/etiquetas/delete/'+idTag);
  }

/**
 * Metodo obtener lista flitrando por creador
 * @param tagrequest
 * @returns Tag[]
 */
  getAllTagsByCreador(tagrequest:any): Observable<Tag[]> {

    if(tagrequest.limite===0)tagrequest.limite=10

    if(tagrequest.creador==undefined)tagrequest.creador="";

    return this.http.get<Tag[]>('https://proyectofinal-ingenia.herokuapp.com/api/etiquetas?creador='+tagrequest.creador+'&pagina='+tagrequest.pagina+"&limite="+tagrequest.limite);

}

/**
 * Metodo obtener lista flitrando por fecha de creacion
 * @param tagrequest
 * @returns Tag[]
 */
  getAllTagbyFeCr(tagrequest:any): Observable<Tag[]> {

   if(tagrequest.limite===0)tagrequest.limite=10


    return this.http.get<Tag[]>('https://proyectofinal-ingenia.herokuapp.com/api/etiquetas?fechaCreacion='+tagrequest.fechaCreacion+'&pagina='+tagrequest.pagina+"&limite="+tagrequest.limite);
  }
/**
 * Metodo obtener lista flitrando por nombre
 * @param tagrequest
 * @returns Tag[]
 */
  getAllTagsByName(tagrequest:any): Observable<Tag[]> {
console.log(tagrequest)
              if(tagrequest.nombre==undefined)tagrequest.nombre="";

        //console.log('http://localhost:8082/api/etiquetas?nombre='+tagrequest.nombre+'&pagina='+tagrequest.pagina+"&limite="+tagrequest.limite)
        return this.http.get<Tag[]>('https://proyectofinal-ingenia.herokuapp.com/api/etiquetas?nombre='+tagrequest.nombre+'&pagina='+tagrequest.pagina+"&limite="+tagrequest.limite);
  }

  /**
 * Metodo obtener lista de todas las tags
 * @param tagrequest
 * @returns Tag[]
 */
  getAllTags(tag:any): Observable<Tag[]> {

    if(tag.pagina===undefined) tag.pagina=0

    if(tag.limite===undefined) tag.limite=10

      return this.http.get<Tag[]>('https://proyectofinal-ingenia.herokuapp.com/api/etiquetas?pagina='+tag.pagina+"&limite="+tag.limite);
  }

}
