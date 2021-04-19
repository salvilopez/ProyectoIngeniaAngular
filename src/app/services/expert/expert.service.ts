import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpertRequest } from 'src/app/models/expert/expert-request.model';
import { Expert } from 'src/app/models/expert/expert.model';


@Injectable({
  providedIn: 'root'
})
export class ExpertService {

  constructor(private http: HttpClient, ) { }


  getAllExpertsByValoracion(expertRequest:ExpertRequest): Observable<Expert[]> {

    //TODO----------------------
    if(expertRequest.limite===0)expertRequest.limite=10

    if(expertRequest.puntuacion===101){
      return this.getAllExperts(expertRequest);
  }
    //TODO----------------------
    if (isNaN(expertRequest.puntuacion)) {
      expertRequest.puntuacion=0
    }

    return this.http.get<Expert[]>('http://localhost:8082/api/expertos?puntuacion='+expertRequest.puntuacion+'&pagina='+expertRequest.pagina+"&limite="+expertRequest.limite);
  }

  getExpertsById(num:number): Observable<Expert> {

    return this.http.get<Expert>('http://localhost:8082/api/expertos/'+num);
  }
  getAllExpertsByName(expertRequest:ExpertRequest): Observable<Expert[]> {
    //TODO----------------------
    if(expertRequest.limite===0)expertRequest.limite=10
    //TODO----------------------


    console.log(expertRequest)
    return this.http.get<Expert[]>('http://localhost:8082/api/expertos?nombre='+expertRequest.nombre+'&pagina='+expertRequest.pagina+"&limite="+expertRequest.limite);
  }



  getAllExpertsByestado(expertRequest:ExpertRequest): Observable<Expert[]> {
    //TODO----------------------
    if(expertRequest.limite===0)expertRequest.limite=10
    //TODO----------------------
    if(expertRequest.estado==='todos'){
        return this.getAllExperts(expertRequest);
    }

    return this.http.get<Expert[]>('http://localhost:8082/api/expertos?estado='+expertRequest.estado+'&pagina='+expertRequest.pagina+"&limite="+expertRequest.limite);
  }
  getAllExpertsByModalidad(expertRequest:ExpertRequest): Observable<Expert[]> {
    //TODO----------------------
    if(expertRequest.limite===0)expertRequest.limite=10
    //TODO----------------------
    return this.http.get<Expert[]>('http://localhost:8082/api/expertos?modalidad='+expertRequest.modalidad+'&pagina='+expertRequest.pagina+"&limite="+expertRequest.limite);
  }

  getAllExperts(expertRequest:ExpertRequest){
    //TODO----------------------
    if(expertRequest.limite===0)expertRequest.limite=10
    //TODO----------------------
    return this.http.get<Expert[]>('http://localhost:8082/api/expertos?pagina='+expertRequest.pagina+"&limite="+expertRequest.limite);
  }

}
