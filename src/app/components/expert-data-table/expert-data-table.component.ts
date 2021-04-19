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
import { Subscription } from 'rxjs';
import { ExpertRequest } from 'src/app/models/expert/expert-request.model';
import { ExpertTable } from 'src/app/models/expert/expert-table.model';
import { Expert } from 'src/app/models/expert/expert.model';
import { ExpertService } from 'src/app/services/expert/expert.service';

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

  expertSubscription: Subscription = new Subscription();
  expertAllSubscription = new Subscription();
  expertRequest: ExpertRequest = new ExpertRequest(0, 0, '', '', '',0);
  constructor(private expertsService: ExpertService) {
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

  applyFilterByName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.expertRequest.nombre = filterValue;
    this.expertSubscription = this.expertsService
      .getAllExpertsByName(this.expertRequest)
      .subscribe((result) => {
        if (result.length ===0) {
          this.expertRequest.nombre="";
          this.expertAllSubscription = this.expertsService
            .getAllExperts(this.expertRequest)
            .subscribe((res) => {
              this.listaExpertTable = res;
            });
        } else {
          this.listaExpertTable = result;

      }
      });
  }



  applyFilterByEstado(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.expertRequest.estado = filterValue;
    this.expertSubscription = this.expertsService
      .getAllExpertsByestado(this.expertRequest)
      .subscribe((result) => {
        if (result.length ===0) {
          this.expertRequest.estado="";
          this.expertAllSubscription = this.expertsService
            .getAllExperts(this.expertRequest)
            .subscribe((res) => {
              this.listaExpertTable = res;
            });
        } else {
          this.listaExpertTable = result;

      }
      });
  }
  applyFilterByValoracion(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.expertRequest.puntuacion = parseInt(filterValue);
    this.expertSubscription = this.expertsService
      .getAllExpertsByValoracion(this.expertRequest)
      .subscribe((result) => {
        console.log(result);
        if (result.length ===0) {
          this.expertRequest.puntuacion=0;
          this.expertAllSubscription = this.expertsService
            .getAllExperts(this.expertRequest)
            .subscribe((res) => {
              this.listaExpertTable = res;
            });
        } else {
          this.listaExpertTable = result;

      }
      });
  }
  ngOnDestroy(): void {
    this.expertSubscription.unsubscribe();
    this.expertAllSubscription.unsubscribe();
  }
}
