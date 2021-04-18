import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs/internal/Subscription';
import { ExpertRequest } from 'src/app/models/expert/expert-request.model';
import { Expert } from 'src/app/models/expert/expert.model';
import {ExpertService} from 'src/app/services/expert/expert.service'
@Component({
  selector: 'app-experts-list',
  templateUrl: './experts-list.component.html',
  styleUrls: ['./experts-list.component.scss']
})
export class ExpertsListComponent implements OnInit {

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
    console.log(this.expertList)

  },(err)=>{
    this.snackBar.open('Erroral Traer la lista de Contactos', err.message, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  });

}
}

