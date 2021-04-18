import { Component, DoCheck, OnInit,ViewChild ,AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Expert } from 'src/app/models/expert/expert.model';
@Component({
  selector: 'app-experts-table',
  templateUrl: './experts-table.component.html',
  styleUrls: ['./experts-table.component.scss']
})
export class ExpertsTableComponent implements DoCheck {
  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource!: MatTableDataSource<Expert>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listExpert:Expert[]=[];
  constructor() {


    // Assign the data to the data source for the table to render
    //Aqui se pone la lista this.datasource=(users)
    //this.dataSource = new MatTableDataSource(users);
  }
  ngDoCheck(): void {
    this.dataSource = new MatTableDataSource(this.listExpert);
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
}




