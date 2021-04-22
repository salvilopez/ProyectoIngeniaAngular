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


  createTags(tag:Tag): Observable<Tag> {


    return this.http.post<Tag>('http://localhost:8082/api/etiquetas',tag);
  }
  deleteTag(idTag:number): Observable<Tag> {

    console.log('http://localhost:8082/api/etiquetas/delete/'+idTag)
    return this.http.delete<Tag>('http://localhost:8082/api/etiquetas/delete/'+idTag);
  }


  getAllTagsByCreador(tagrequest:TagRequest): Observable<Tag[]> {

    //TODO----------------------
    if(tagrequest.limite===0)tagrequest.limite=10
    //TODO----------------------
    if(tagrequest.creador==undefined)tagrequest.creador="";
    console.log('http://localhost:8082/api/etiquetas?creador='+tagrequest.creador+'&pagina='+tagrequest.pagina+"&limite="+tagrequest.limite)
    return this.http.get<Tag[]>('http://localhost:8082/api/etiquetas?creador='+tagrequest.creador+'&pagina='+tagrequest.pagina+"&limite="+tagrequest.limite);

}

//TODO---------------------------------------------------------
//TODO---------------------------------------------------------
//TODO falla al filtrar la fecha
//TODO---------------------------------------------------------
getAllTagbyFeCr(tagrequest:TagRequest): Observable<Tag[]> {

  //TODO----------------------
  if(tagrequest.limite===0)tagrequest.limite=10
  //TODO----------------------
  if(tagrequest.fechaCreacion==undefined)tagrequest.fechaCreacion=new Date();

  console.log('http://localhost:8082/api/etiquetas?fechaCreacion='+tagrequest.fechaCreacion+'&pagina='+tagrequest.pagina+"&limite="+tagrequest.limite)
  return this.http.get<Tag[]>('http://localhost:8082/api/etiquetas?fechaCreacion='+tagrequest.fechaCreacion+'&pagina='+tagrequest.pagina+"&limite="+tagrequest.limite);

}
//TODO---------------------------------------------------------
//TODO---------------------------------------------------------
//TODO---------------------------------------------------------

  getAllTagsByName(tagrequest:TagRequest): Observable<Tag[]> {

        //TODO----------------------
        if(tagrequest.limite===0)tagrequest.limite=10
        //TODO----------------------
        if(tagrequest.nombre==undefined)tagrequest.nombre="";

        return this.http.get<Tag[]>('http://localhost:8082/api/etiquetas?nombre='+tagrequest.nombre+'&pagina='+tagrequest.pagina+"&limite="+tagrequest.limite);

  }

  getAllTags(tag:TagRequest): Observable<Tag[]> {
    if(tag.pagina===undefined) tag.pagina=0
    if(tag.limite===undefined) tag.limite=10
console.log('http://localhost:8082/api/etiquetas?pagina='+tag.pagina+"&limite="+tag.limite)
      return this.http.get<Tag[]>('http://localhost:8082/api/etiquetas?pagina='+tag.pagina+"&limite="+tag.limite);


  }



}
