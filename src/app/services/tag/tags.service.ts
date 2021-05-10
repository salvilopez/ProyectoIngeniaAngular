import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TagRequest } from 'src/app/models/tag/tag-request.model';
import { Tag } from 'src/app/models/tag/tag.model';
@Injectable({
  providedIn: 'root'
})
export class TagsService {
  urlbase:string='https://proyectofinal-ingenia.herokuapp.com'
  //urlbase:string='http://localhost:8081'
  constructor(private http: HttpClient) { }

/**
 * Metodo ctrear tags
 * @param tag
 * @returns Tag
 */
  createTags(tag:Tag): Observable<Tag> {
    let token =sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ 
        "Authorization":"Bearer "+token
      })
    };
   return this.http.post<Tag>(this.urlbase+'/api/etiquetas',tag,httpOptions);
  }

/**
 * Metodo borrar tags
 * @param idTag
 * @returns Tag borrada
 */
  deleteTag(idTag:number): Observable<Tag> {
    let token =sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ 
        "Authorization":"Bearer "+token
      })
    };
    return this.http.delete<Tag>(this.urlbase+'/api/etiquetas/delete/'+idTag,httpOptions);
  }

/**
 * Metodo obtener lista flitrando por creador
 * @param tagrequest
 * @returns Tag[]
 */
  getAllTagsByCreador(tagrequest:any): Observable<Tag[]> {
    let token =sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ 
        "Authorization":"Bearer "+token
      })
    };
    if(tagrequest.limite===0)tagrequest.limite=10

    if(tagrequest.creador==undefined)tagrequest.creador="";

    return this.http.get<Tag[]>(this.urlbase+'/api/etiquetas?creador='+tagrequest.creador+'&pagina='+tagrequest.pagina+"&limite="+tagrequest.limite,httpOptions);

}

/**
 * Metodo obtener lista flitrando por fecha de creacion
 * @param tagrequest
 * @returns Tag[]
 */
  getAllTagbyFeCr(tagrequest:any): Observable<Tag[]> {
    let token =sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ 
        "Authorization":"Bearer "+token
      })
    };
   if(tagrequest.limite===0)tagrequest.limite=10


    return this.http.get<Tag[]>(this.urlbase+'/api/etiquetas?fechaCreacion='+tagrequest.fechaCreacion+'&pagina='+tagrequest.pagina+"&limite="+tagrequest.limite,httpOptions);
  }
/**
 * Metodo obtener lista flitrando por nombre
 * @param tagrequest
 * @returns Tag[]
 */
  getAllTagsByName(tagrequest:any): Observable<Tag[]> {
    let token =sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ 
        "Authorization":"Bearer "+token
      })
    };
              if(tagrequest.nombre==undefined)tagrequest.nombre="";

        //console.log('http://localhost:8082/api/etiquetas?nombre='+tagrequest.nombre+'&pagina='+tagrequest.pagina+"&limite="+tagrequest.limite)
        return this.http.get<Tag[]>(this.urlbase+'/api/etiquetas?nombre='+tagrequest.nombre+'&pagina='+tagrequest.pagina+"&limite="+tagrequest.limite,httpOptions);
  }

  /**
 * Metodo obtener lista de todas las tags
 * @param tagrequest
 * @returns Tag[]
 */
  getAllTags(tag:any): Observable<Tag[]> {
    let token =sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ 
        "Authorization":"Bearer "+token
      })
    };
    if(tag.pagina===undefined) tag.pagina=0

    if(tag.limite===undefined) tag.limite=10

      return this.http.get<Tag[]>(this.urlbase+'/api/etiquetas?pagina='+tag.pagina+"&limite="+tag.limite,httpOptions);
  }

}
