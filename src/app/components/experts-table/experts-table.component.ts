import { Component, DoCheck, OnInit,ViewChild ,AfterViewInit, Input} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ExpertRequest } from 'src/app/models/expert/expert-request.model';
import { Expert } from 'src/app/models/expert/expert.model';
import {ExpertService} from 'src/app/services/expert/expert.service'




export interface UserData {
  nombre: string;
  estado: string;
  etiquetas: string;
  puntuacion: number;
}

@Component({
  selector: 'app-experts-table',
  templateUrl: './experts-table.component.html',
  styleUrls: ['./experts-table.component.scss']
})
export class ExpertsTableComponent implements AfterViewInit , OnInit
 {
  displayedColumns: string[] = ['nombre', 'estado', 'etiquetas', 'puntuacion'];
  dataSource: MatTableDataSource<Expert>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  expertRequest:ExpertRequest=new ExpertRequest(0,0,"","","");
  @Input() listExpert:any=[];
  constructor( private expertService:ExpertService) {


    this.dataSource = new MatTableDataSource(this.listExpert);


    // Assign the data to the data source for the table to render
    //Aqui se pone la lista this.datasource=(users)
    //this.dataSource = new MatTableDataSource(users);
  }
  ngOnInit(): void {
    this.getExperts();
  }

  ngDoCheck(): void {
    alert(this.dataSource.data[0].nombre)
this.dataSource=this.listExpert ;


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getExperts(){
    this.expertService.getAllExperts(this.expertRequest).subscribe((response)=>{
      this.listExpert=response;
      console.log(this.listExpert)
    })
}



 }
