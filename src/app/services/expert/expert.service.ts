import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { ExpertRequest } from 'src/app/models/expert/expert-request.model';
import { Expert } from 'src/app/models/expert/expert.model';


@Injectable({
  providedIn: 'root'
})
export class ExpertService {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer ) { }

/**
 *
 * @param expert Metodo actualizar Expert
 * @returns Expert actualizado
 */
  updateExpert(expert:Expert): Observable<Expert> {

    return this.http.put<Expert>('http://localhost:8082/api/expertos',expert);

  }
  /**
   * Metodo para convertir cualquier imagen a base64
   * @param $event
   * @returns
   */
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
  /**
   * FindAll Experts By Valoracion
   * @param expertRequest
   * @returns Experts[]
   */
  getAllExpertsByValoracion(expertRequest:ExpertRequest): Observable<Expert[]> {

    if(expertRequest.limite===0)expertRequest.limite=10

    if(expertRequest.puntuacion===101){
      return this.getAllExperts(expertRequest);
  }
    if (isNaN(expertRequest.puntuacion)) {
      expertRequest.puntuacion=0
    }

    return this.http.get<Expert[]>('http://localhost:8082/api/expertos?puntuacion='+expertRequest.puntuacion+'&pagina='+expertRequest.pagina+"&limite="+expertRequest.limite);
  }
  /**
   * Find Experts By Id
   * @param number
   * @returns Experts
   */
  getExpertsById(num:number): Observable<Expert> {

    return this.http.get<Expert>('http://localhost:8082/api/expertos/'+num);
  }

  /**
   * Metodo para Crear un expert
   * @param expert
   * @returns expert creado
   */
  createExpert(expert:Expert): Observable<Expert> {

    return this.http.post<Expert>('http://localhost:8082/api/expertos',expert);
  }


  /**
   * metodo filtrar por nombre
   * @param expertRequest
   * @returns
   */
  getAllExpertsByName(expertRequest:ExpertRequest): Observable<Expert[]> {

    if(expertRequest.limite===0)expertRequest.limite=10

    return this.http.get<Expert[]>('http://localhost:8082/api/expertos?nombre='+expertRequest.nombre+'&pagina='+expertRequest.pagina+"&limite="+expertRequest.limite);
  }


/**
 * Metodo para filtrar por estado
 * @param expertRequest
 * @returns Expert[]
 */
  getAllExpertsByestado(expertRequest:ExpertRequest): Observable<Expert[]> {

    if(expertRequest.limite===0)expertRequest.limite=10

    if(expertRequest.estado==='todos'){
        return this.getAllExperts(expertRequest);
    }

    return this.http.get<Expert[]>('http://localhost:8082/api/expertos?estado='+expertRequest.estado+'&pagina='+expertRequest.pagina+"&limite="+expertRequest.limite);
  }

/**
 * Metodo para filtrar por Modalidas
 * @param expertRequest
 * @returns
 */
  getAllExpertsByModalidad(expertRequest:ExpertRequest): Observable<Expert[]> {

    if(expertRequest.limite===0)expertRequest.limite=10

    return this.http.get<Expert[]>('http://localhost:8082/api/expertos?modalidad='+expertRequest.modalidad+'&pagina='+expertRequest.pagina+"&limite="+expertRequest.limite);
  }

  /**
   * Metodo para traer todos los expertos
   * @param expertRequest
   * @returns
   */
  getAllExperts(expertRequest:ExpertRequest){

    if(expertRequest.limite===0)expertRequest.limite=10

    return this.http.get<Expert[]>('http://localhost:8082/api/expertos?pagina='+expertRequest.pagina+"&limite="+expertRequest.limite);
  }

}
