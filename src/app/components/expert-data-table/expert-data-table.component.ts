import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExpertTable } from 'src/app/models/expert/expert-table.model';
import { Expert } from 'src/app/models/expert/expert.model';

@Component({
  selector: 'app-expert-data-table',
  templateUrl: './expert-data-table.component.html',
  styleUrls: ['./expert-data-table.component.scss'],
})
export class ExpertDataTableComponent implements AfterViewInit, OnInit {
  displayedColumns = ['nombre', 'estado', 'etiquetas', 'puntuacion'];

  dataSource: MatTableDataSource<Expert>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() listaExpertTable: any = [];
  constructor() {
    // Create 100 users
    //const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.listaExpertTable);
  }
  ngOnInit(): void {
    console.log(this.listaExpertTable);
  }
  ngDoCheck(): void {
    this.dataSource = this.listaExpertTable;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getColorValoracion(num: number): string {
    if (num >= 80) return '#4ADEBB';
    if (num < 80 && num >= 60) return '#B1F0A1';
    if (num < 60 && num >= 40) return '#F0CE76';
    if (num < 40 && num >= 20) return '#DEA876';
    if (num < 0 && num >= 0) return '#D66464';
    if (num == 0) return '#C7C8CD';
    return '#C7C8CD';
  }
  getColorEstado(estado: string): string {
    switch (estado) {
      case 'validado':
        return '#4ADEBB';
        break;
      case 'pendiente':
        return '#DEA876';
        break;
      default:
        return '#D66464';
    }
  }
  getletraEstado(estado: string): string {
    switch (estado) {
      case 'validado':
        return 'Validado';
        break;
      case 'pendiente':
        return 'Pdte.Validar';
        break;
      default:
        return 'No Validado';
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
