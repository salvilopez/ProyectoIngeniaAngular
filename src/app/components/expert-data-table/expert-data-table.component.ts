import { EventEmitter, Output } from '@angular/core';
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
import { TagRequest } from 'src/app/models/tag/tag-request.model';
import { Tag } from 'src/app/models/tag/tag.model';
import { ExpertService } from 'src/app/services/expert/expert.service';
import { TagsService } from 'src/app/services/tag/tags.service';
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
  expertRequest: ExpertRequest = new ExpertRequest(0, 0, '', '', '', 0);
  tagRequest: TagRequest = new TagRequest('', 0, 0);


  constructor(
    private expertsService: ExpertService,
    private tagsService: TagsService
  ) {
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


  localStorage.setItem('totalExpert',this.listaExpertTable.length);
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
        this.listaExpertTable = result;
      });
  }

  applyFilterByEstado(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.expertRequest.estado = filterValue;
    this.expertSubscription = this.expertsService
      .getAllExpertsByestado(this.expertRequest)
      .subscribe((result) => {
        this.listaExpertTable = result;
      });
  }
  applyFilterByValoracion(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.expertRequest.puntuacion = parseInt(filterValue);
    this.expertSubscription = this.expertsService
      .getAllExpertsByValoracion(this.expertRequest)
      .subscribe((result) => {
        this.listaExpertTable = result;
      });
  }


  //TODO----------------------------
  applyFilterByEtiquetas(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tagRequest.nombre = filterValue;
    console.log(filterValue);
    this.expertSubscription = this.tagsService
      .getAllTagsByName(this.tagRequest)
      .subscribe((result: Tag[]) => {
        if (result.length !== 0) {
          this.listaExpertTable =this.tratarTags(result)
        }
      });
  }




  tratarTags(result: any) {
    let listTag: Tag[] = result;
    let listExper: Expert[] = [];
    for (let i = 0; i < listTag.length; i++)
      for (let j = 0; j < listTag[i].expertList.length; j++) {
        listExper.push(listTag[i].expertList[j]);
      }

    let sinRepetidos = listExper.filter(
      (valorActual, indiceActual, arreglo) => {
        //Podríamos omitir el return y hacerlo en una línea, pero se vería menos legible
        return (
          arreglo.findIndex(
            (valorDelArreglo) =>
              JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)
          ) === indiceActual
        );
      }
    );
    return sinRepetidos;
  }

  //TODO----------------------------
  ngOnDestroy(): void {
    this.expertSubscription.unsubscribe();
    this.expertAllSubscription.unsubscribe();
  }
}