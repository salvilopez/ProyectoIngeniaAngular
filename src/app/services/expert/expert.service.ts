import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AddExpert } from 'src/app/models/expert/add-expert.model';
import { ExpertRequest } from 'src/app/models/expert/expert-request.model';
import { Expert } from 'src/app/models/expert/expert.model';


@Injectable({
  providedIn: 'root'
})
export class ExpertService {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer ) { }


  updateExpert(expert:Expert): Observable<Expert> {

    return this.http.put<Expert>('http://localhost:8082/api/expertos',expert);

  }
  extraerBase64 = async ($event: any) =>
  new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result,
        });
      };
      reader.onerror = (error) => {
        resolve({
          base: null,
        });
      };
    } catch (e) {
      return null;
    }
  });
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

  createExpert(expert:Expert): Observable<Expert> {
    expert.created_at=new Date();


    return this.http.post<Expert>('http://localhost:8082/api/expertos',expert);
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
