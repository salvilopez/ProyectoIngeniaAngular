import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs/internal/Subscription';
import { ExpertRequest } from 'src/app/models/expert/expert-request.model';
import { ExpertTable } from 'src/app/models/expert/expert-table.model';
import { Expert } from 'src/app/models/expert/expert.model';
import {ExpertService} from 'src/app/services/expert/expert.service'
@Component({
  selector: 'app-experts-list',
  templateUrl: './experts-list.component.html',
  styleUrls: ['./experts-list.component.scss']
})
export class ExpertsListComponent implements OnInit {
  listaExpertTable:ExpertTable[]=[];
  expertList:any[]=[]
  expertSubscription: Subscription = new Subscription();
  expertRequest:ExpertRequest=new ExpertRequest(0,0,"","","");
  constructor(private expertsService:ExpertService,  private snackBar: MatSnackBar,) {



   }

  ngOnInit(): void {
this.getExperts();

  }
getExperts(){
  this.expertSubscription=this.expertsService.getAllExperts(this.expertRequest).subscribe((response)=>{
    this.expertList=response;

      for (let index = 0; index < this.expertList.length; index++) {
        this.listaExpertTable.push(new ExpertTable(this.expertList[index].nombre,this.expertList[index].estado,this.expertList[index].puntuacion,this.expertList[index].tagList) )
      }





  },(err)=>{
    this.snackBar.open('Erroral Traer la lista de Contactos', err.message, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  });

}
}

