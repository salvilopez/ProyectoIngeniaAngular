import { DoCheck, Input } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
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
  displayedColumns: string[] = ['etiqueta', 'creador', 'created_at',"botonBorrar"];
  dataSource: MatTableDataSource<Tag>;
  @Input() listaTagTable: any = [];
  tagSubscription: Subscription = new Subscription();;
  tagRequest: TagRequest = new TagRequest('',0, 0,"",new Date());
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions = [1,2,3,4,5, 10, 15, 20];
  showFirstLastButtons = true;
  pageSize:any;
  pageIndex:any;
  length:any = 20;

nombre:any;
creador:any;
fecha:any;


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
  handlePageEvent(event: PageEvent) {

    /*let tag1={
      nombre:"",
      limite:0,
      pagina:0,
      creador:"",
      fechaCreacion:"",
     }

    tag1.limite=event.pageSize;
    tag1.pagina=event.pageIndex;
     tag1.nombre=this.nombre;
     tag1.creador=this.creador;
     console.log(this.fecha)
     if(this.fecha!==undefined){
     tag1.fechaCreacion=new Date(this.fecha).toISOString().slice(0,10)
     }else{
      tag1.fechaCreacion=""
     }

     this.tagSubscription=this.tagsService.getAllTagsByall(tag1).subscribe((result)=>{
      this.listaTagTable = result;

     })*/






  }

  //TODO----------------------





















  /**
   * Aplicar flitro de etiqueta por nombre
   * @param event
   */
  applyFilterByName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
   this.tagRequest.nombre = filterValue;
   this.tagRequest.pagina=this.pageIndex;
   this.tagRequest.limite=this.pageSize;
   if(this.tagRequest.limite===undefined)this.tagRequest.limite=10

   if(this.tagRequest.pagina===undefined)this.tagRequest.pagina=0

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
   let ta={
    nombre: this.tagRequest.nombre,
    limite:this.pageSize,
    pagina:this.pageIndex,
    creador:this.tagRequest.creador,
    fechaCreacion:new Date(filterValue).toISOString().slice(0,10),
    expertList:this.tagRequest.expertList
   }

   if(ta.limite===undefined)ta.limite=10

   if(ta.pagina===undefined)ta.pagina=0


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
   this.tagRequest.pagina=this.pageIndex;
   this.tagRequest.limite=this.pageSize;

   if(this.tagRequest.limite===undefined)this.tagRequest.limite=10

   if(this.tagRequest.pagina===undefined)this.tagRequest.pagina=0

    this.tagSubscription = this.tagsService
      .getAllTagsByCreador(this.tagRequest)
     .subscribe((result) => {
        this.listaTagTable = result;
     });
  }
}
