import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { ExpertRequest } from 'src/app/models/expert/expert-request.model';
import { Expert } from 'src/app/models/expert/expert.model';


@Injectable({
  providedIn: 'root'
})
export class ExpertService {
  urlbase:string='https://proyectofinal-ingenia.herokuapp.com'
//urlbase:string='http://localhost:8081'
  constructor(private http: HttpClient, private sanitizer: DomSanitizer ) { }

/**
 *
 * @param expert Metodo actualizar Expert
 * @returns Expert actualizado
 */
  updateExpert(expert:Expert): Observable<Expert> {

    let token =sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ 
        "Authorization":"Bearer "+token
      })
    };


    return this.http.put<Expert>(this.urlbase+'/api/expertos',expert,httpOptions);

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
  getAllExpertsByValoracion(expertRequest:any): Observable<Expert[]> {

    if(expertRequest.limite===0)expertRequest.limite=10

    if(expertRequest.puntuacion===101){
      return this.getAllExperts(expertRequest);
  }
    if (isNaN(expertRequest.puntuacion)) {
      expertRequest.puntuacion=0
    }

    let token =sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ 
        "Authorization":"Bearer "+token
      })
    };


    return this.http.get<Expert[]>(this.urlbase+'/api/expertos?puntuacion='+expertRequest.puntuacion+'&pagina='+expertRequest.pagina+"&limite="+expertRequest.limite,httpOptions);
  }
  /**
   * Find Experts By Id
   * @param number
   * @returns Experts
   */
  getExpertsById(num:number): Observable<Expert> {

    let token =sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ 
        "Authorization":"Bearer "+token
      })
    };


    return this.http.get<Expert>(this.urlbase+'/api/expertos/'+num,httpOptions);
  }

  /**
   * Metodo para Crear un expert
   * @param expert
   * @returns expert creado
   */
  createExpert(expert:Expert): Observable<Expert> {

    let token =sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ 
        "Authorization":"Bearer "+token
      })
    };


    return this.http.post<Expert>(this.urlbase+'/api/expertos',expert,httpOptions);
  }


  /**
   * metodo filtrar por nombre
   * @param expertRequest
   * @returns
   */
  getAllExpertsByName(expertRequest:any): Observable<Expert[]> {

    if(expertRequest.limite===0)expertRequest.limite=10


    let token =sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ 
        "Authorization":"Bearer "+token
      })
    };
    return this.http.get<Expert[]>(this.urlbase+'/api/expertos?nombre='+expertRequest.nombre+'&pagina='+expertRequest.pagina+"&limite="+expertRequest.limite,httpOptions);
  }
  getAllExpertsBytags(expertRequest:any): Observable<Expert[]> {

    if(expertRequest.limite===0)expertRequest.limite=10


    let token =sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ 
        "Authorization":"Bearer "+token
      })
    };
    return this.http.get<Expert[]>(this.urlbase+'/api/expertos?etiqueta='+expertRequest.etiqueta+'&pagina='+expertRequest.pagina+"&limite="+expertRequest.limite,httpOptions);
  }

/**
 * Metodo para filtrar por estado
 * @param expertRequest
 * @returns Expert[]
 */
  getAllExpertsByestado(expertRequest:any): Observable<Expert[]> {

    if(expertRequest.limite===0)expertRequest.limite=10

    if(expertRequest.estado==='todos'){
        return this.getAllExperts(expertRequest);
    }
    let token =sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ 
        "Authorization":"Bearer "+token
      })
    };
    return this.http.get<Expert[]>(this.urlbase+'/api/expertos?estado='+expertRequest.estado+'&pagina='+expertRequest.pagina+"&limite="+expertRequest.limite,httpOptions);
  }

/**
 * Metodo para filtrar por Modalidas
 * @param expertRequest
 * @returns
 */
  getAllExpertsByModalidad(expertRequest:any): Observable<Expert[]> {

    if(expertRequest.limite===0)expertRequest.limite=10
    if(expertRequest.limite===0)expertRequest.limite=10
    let token =sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ 
        "Authorization":"Bearer "+token
      })
    };
    return this.http.get<Expert[]>(this.urlbase+'/api/expertos?modalidad='+expertRequest.modalidad+'&pagina='+expertRequest.pagina+"&limite="+expertRequest.limite,httpOptions);
  }

  /**
   * Metodo para traer todos los expertos
   * @param expertRequest
   * @returns
   */
  getAllExperts(expertRequest:any){

    if(expertRequest.limite===0)expertRequest.limite=10
    let token =sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ 
        "Authorization":"Bearer "+token
      })
    };


    return this.http.get<Expert[]>(this.urlbase+'/api/expertos?pagina='+expertRequest.pagina+"&limite="+expertRequest.limite,httpOptions);
  }

}
