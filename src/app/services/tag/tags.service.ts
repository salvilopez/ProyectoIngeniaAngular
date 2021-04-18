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



  getAllTags(tag:TagRequest): Observable<Tag[]> {
      if(tag.nombre!==undefined) return this.http.get<Tag[]>('http://localhost:8082/api/etiquetas?nombre='+tag.nombre+"&pagina="+tag.pagina+"&limite="+tag.limite);

      return this.http.get<Tag[]>('http://localhost:8082/api/etiquetas&pagina='+tag.pagina+"&limite="+tag.limite);

  }
}
