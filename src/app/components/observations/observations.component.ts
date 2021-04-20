import { Component, DoCheck, Input, OnInit } from '@angular/core';
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
  constructor(private expertService: ExpertService) { }
  ngDoCheck(): void {
    if(this.expertDetail!=undefined){
      this.expDetail=this.expertDetail;
    }
    if(this.expActualizado!==undefined){
      this.expDetail=this.expDetail;
      this.expActualizado=undefined;
    }
  }
  actualizarExperto() {
    this.expDetail.update_at=new Date();
    if(this.motivoNuevo!==''){
        this.expDetail.estado_motivo=this.motivoNuevo;
    }
    let body={
      ...this.expDetail
    }
    console.log("--------------------")
    console.log("antes del update");
    console.log(body)
    console.log("--------------------")
    this.expertService.updateExpert(body).subscribe((response) => {
      this.expActualizado = response;
      console.log("--------------------")
      console.log("depues del update");
      console.log(this.expActualizado)
      console.log("--------------------")
    });
  }

}
