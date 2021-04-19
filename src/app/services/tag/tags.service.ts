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



  getAllTagsByName(tagrequest:TagRequest): Observable<Tag[]> {

        //TODO----------------------
        if(tagrequest.limite===0)tagrequest.limite=10
        //TODO----------------------
        if(tagrequest.nombre==undefined)tagrequest.nombre="";
         console.log(tagrequest)
         console.log('http://localhost:8082/api/etiquetas?nombre='+tagrequest.nombre+'&pagina='+tagrequest.pagina+"&limite="+tagrequest.limite)

        return this.http.get<Tag[]>('http://localhost:8082/api/etiquetas?nombre='+tagrequest.nombre+'&pagina='+tagrequest.pagina+"&limite="+tagrequest.limite);


  }

  getAllTags(tag:TagRequest): Observable<Tag[]> {
    if(tag.pagina===undefined) tag.pagina=0
    if(tag.limite===undefined) tag.limite=10
console.log('http://localhost:8082/api/etiquetas?pagina='+tag.pagina+"&limite="+tag.limite)
      return this.http.get<Tag[]>('http://localhost:8082/api/etiquetas?pagina='+tag.pagina+"&limite="+tag.limite);


  }
}
