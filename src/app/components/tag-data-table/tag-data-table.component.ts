import { DoCheck, Input } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { TagRequest } from 'src/app/models/tag/tag-request.model';
import { Tag } from 'src/app/models/tag/tag.model';
import { TagsService } from 'src/app/services/tag/tags.service';
import { DialogDeleteTagComponent } from '../dialog-delete-tag/dialog-delete-tag.component';

@Component({
  selector: 'app-tag-data-table',
  templateUrl: './tag-data-table.component.html',
  styleUrls: ['./tag-data-table.component.scss']
})
export class TagDataTableComponent implements DoCheck {
  displayedColumns: string[] = ['etiqueta', 'creador', 'fechaCreacion','botonBorrar'];
  dataSource: MatTableDataSource<Tag>;
  @Input() listaTagTable: any = [];
  tagSubscription: Subscription = new Subscription();;
  tagRequest: TagRequest = new TagRequest('',0, 0,"",new Date());
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor( private tagsService: TagsService,public dialog:MatDialog) {

    this.dataSource = new MatTableDataSource(this.listaTagTable);
  }

  ngDoCheck(): void {

    this.dataSource = this.listaTagTable;
    localStorage.setItem('totalTags',this.listaTagTable.length);
  }

  ngOnInit(): void {

  }
  /**
   * Metodo abrir ventana modal
   * @param dato
   */
  openDialog2(dato:any){
      this.dialog.open(DialogDeleteTagComponent,{
      data:{tag:JSON.stringify(dato)}
    });
  }

  /**
   * Aplicar flitro de etiqueta por nombre
   * @param event
   */
  applyFilterByName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
   this.tagRequest.nombre = filterValue;
    this.tagSubscription = this.tagsService
      .getAllTagsByName(this.tagRequest)
     .subscribe((result) => {
        this.listaTagTable = result;
     });
  }
    /**
   * Aplicar flitro de etiqueta por fecha
   * @param event
   */
  applyFilterByFechaCrea(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    let day=new Date(filterValue).getDay()
    let mes=new Date(filterValue).getMonth()
    let year=new Date(filterValue).getFullYear();
   let ta={
    nombre: this.tagRequest.nombre,
    limite:this.tagRequest.limite,
    pagina:this.tagRequest.pagina,
    creador:this.tagRequest.creador,
    ///fechaCreacion:year+"-"+mes+"-"+day,
    fechaCreacion:new Date(filterValue).toISOString().slice(0,10),
    expertList:this.tagRequest.expertList
   }

    this.tagSubscription = this.tagsService
      .getAllTagbyFeCr(ta)
     .subscribe((result) => {
        this.listaTagTable = result;
     });
  }

    /**
   * Aplicar flitro de etiqueta por creador
   * @param event
   */
  applyFilterByCreador(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
   this.tagRequest.creador = filterValue;
    this.tagSubscription = this.tagsService
      .getAllTagsByCreador(this.tagRequest)
     .subscribe((result) => {
        this.listaTagTable = result;
     });
  }
}
