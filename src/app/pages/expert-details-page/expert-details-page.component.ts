import { DoCheck } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  expertDet: Expert=new Expert("", new Date(),new Date(),"","","",false,0,"","","",0,0,0,"","","","","","","","","","");
  id:number=0;
  expertActualizado:any;
  archivoCapturado:any;
  archivoBase64:any;
  direccionvisible:boolean = false;
  nifvisible:boolean = false;
  constructor(
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private expertService: ExpertService,
    public router: Router
  ) {}
  ngDoCheck(): void {




  }


  ngOnInit(): void {

    if(this.expertDet.id===0||this.id===0){

      this.routerSubscription = this.activatedRoute.params.subscribe((params) => {
        this.id=  params.id
      });
        this.expertSubscription = this.expertService
        .getExpertsById(this.id)
        .subscribe((data: Expert) => {
          this.expertDet=data;
          this.expertActualizado= this.expertDet;
        });

    }else{
      this.expertDet=this.expertActualizado;
    }


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
    this.expertDet.updated_at=new Date();
    let body={
      ...this.expertDet
    }
    this.expertService.updateExpert(body).subscribe((response) => {
      this.expertActualizado = response;
      this.snackBar.open(
        'OK!',
        'Actualizado Correctamente',
        {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        }
      );

    });
  }
  visibledireccion(){
    this.direccionvisible=!this.direccionvisible;

  }
  visiblenif(){
    this.nifvisible=!this.nifvisible;

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
      this.expertDet.fichero_foto = base64.base;

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
