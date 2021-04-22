import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Expert } from 'src/app/models/expert/expert.model';
import { ExpertService } from 'src/app/services/expert/expert.service';

@Component({
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss']
})
export class ObservationsComponent  implements DoCheck {
  @Input () expertDetail:any
  motivoNuevo:string=""
  expDetail :any;
  expActualizado :any;
  expertSubscription: Subscription = new Subscription();
  constructor(private expertService: ExpertService, private snackBar: MatSnackBar) { }
  ngDoCheck(): void {
    if(this.expertDetail!=undefined){
      this.expDetail=this.expertDetail;
    }
    if(this.expActualizado!==undefined){
      this.expDetail=this.expDetail;
      this.expActualizado=undefined;
    }
  }
  /**
   * Metodo para actualizar el experto con los campos bindeados
   */
  actualizarExperto() {
    this.expDetail.update_at=new Date();
    if(this.motivoNuevo!==''){
        this.expDetail.estado_motivo=this.motivoNuevo;
    }
    let body={
      ...this.expDetail
    }
    this.expertService.updateExpert(body).subscribe((response) => {
      this.expActualizado = response;
      this.snackBar.open(
        '',
        'Actualizado Correctamente',
        {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        }
      );

    },(error)=>{
      this.snackBar.open(
        'error',
        error.message,
        {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        }
      );






    });
  }

}
