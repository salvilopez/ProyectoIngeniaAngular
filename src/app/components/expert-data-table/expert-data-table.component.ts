
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, DoCheck, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExpertTable } from 'src/app/models/expert/expert-table.model';
import { Expert } from 'src/app/models/expert/expert.model';


@Component({
  selector: 'app-expert-data-table',
  templateUrl: './expert-data-table.component.html',
  styleUrls: ['./expert-data-table.component.scss']
})
export class ExpertDataTableComponent  implements AfterViewInit,OnInit {
@Input() expertList:Expert[]=[]
listaExpertTable:ExpertTable[]=[];
  public displayedColumns = ['nombre', 'estado', 'etiquetas', 'valoracion'
];

  public dataSource = new MatTableDataSource<ExpertTable>();
  constructor() {




   }
  ngAfterViewInit(): void {
this.dataSource.data= this.listaExpertTable;

  }
  ngDoCheck(): void {
    this.listaExpertTable=[];
    for (let index = 0; index < this.expertList.length; index++) {

      this.listaExpertTable.push(new ExpertTable(this.expertList[index].nombre,this.expertList[index].estado,this.expertList[index].puntuacion,this.expertList[index].tagList) )
    }
    this.dataSource.data= this.listaExpertTable;


    console.log(this.dataSource.data)

  }
  ngOnInit(): void {
    for (let index = 0; index < this.expertList.length; index++) {
      this.listaExpertTable.push(new ExpertTable(this.expertList[index].nombre,this.expertList[index].estado,this.expertList[index].puntuacion,this.expertList[index].tagList) )
    }

  }

  public redirectToDetails = (id: string) => {

  }
  public redirectToUpdate = (id: string) => {

  }
  public redirectToDelete = (id: string) => {

  }
  //drop(event: CdkDragDrop<ExpertTable[]>) {
  //  moveItemInArray(this.vegetables, event.previousIndex, event.currentIndex);
  //}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
