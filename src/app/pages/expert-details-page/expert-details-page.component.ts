import { DoCheck } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Expert } from 'src/app/models/expert/expert.model';
import { ExpertService } from 'src/app/services/expert/expert.service';

@Component({
  selector: 'app-expert-details-page',
  templateUrl: './expert-details-page.component.html',
  styleUrls: ['./expert-details-page.component.scss'],
})
export class ExpertDetailsPageComponent implements OnInit {
tabLoadTimes: Date[] = [];
  routerSubscription: Subscription = new Subscription();
  expertSubscription: Subscription = new Subscription();
  expertDet: any;
  id:number=0;
  archivoCapturado:any;
  archivoBase64:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private expertService: ExpertService,
    public router: Router
  ) {}



  ngOnInit(): void {

    if(this.expertDet==undefined){
      this.routerSubscription = this.activatedRoute.params.subscribe((params) => {
        this.id=  params.id
      });
      this.expertSubscription = this.expertService
      .getExpertsById(this.id)
      .subscribe((data: Expert) => {
        this.expertDet=data;

      });

    }


    this.expertSubscription = this.expertService
    .getExpertsById(this.id)
    .subscribe((data: Expert) => {
      this.expertDet=data;
    });
  }
/**
 *
 * @param index
 * @returns
 */
  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }
    return this.tabLoadTimes[index];
  }

  /**
   * Metodo para actualizar el experto
   */
  actualizarExperto() {
    console.log("antes del update");
    this.expertDet.update_at=new Date();
    let body={
      ...this.expertDet
    }
    this.expertService.updateExpert(body).subscribe((response) => {
      this.expertDet = response;

    });
  }

  /**
   *
   * @param event Metodo del input para actaulizar la imagen base
   */
  showPreviewImg(event: any) {
    this.archivoCapturado = event.target.files[0];
    //
    //TODO---.- Importante de Leer ..------

   //TODO opcional porque el servidor no acepta tamaño de la imagen base64
   //TODO(cambiar por lo comentado de abajo , si el servidor admite Base64)

    //TODO----------------------------------------------
   this.expertService
     .extraerBase64(this.archivoCapturado)
    .then((base64: any) => {
      this.archivoBase64 = base64.base;
      if(this.expertDet.fichero_foto !==undefined) this.expertDet.fichero_foto = base64.base;

      this.actualizarExperto()
     });
        //TODO----------------------------------------------
  }
  ngOnDestroy(): void {
    this.expertSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }
  /**
   * Metodo que devuelve la pagina actual
   * @returns String
   */
  pagActual(): string {
  //  console.log(this.router.url)
return this.router.url
  }
}
