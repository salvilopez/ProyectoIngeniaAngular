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
 prefiltro:any="todos";
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

    this.pageIndex = event.pageIndex;
    this.pageSize=event.pageSize

     switch (this.prefiltro) {
       case "nombre":

        let tag1={
          nombre:this.nombre,
          limite:this.pageSize,
          pagina:this.pageIndex,
         }

   if(tag1.limite===undefined)tag1.limite=10

   if(tag1.pagina===undefined)tag1.pagina=0

    this.tagSubscription = this.tagsService
      .getAllTagsByName(tag1)
     .subscribe((result) => {

        this.listaTagTable = result;
        this.prefiltro="nombre"
     });
         break;
         case "creador":

          let tag2={
            creador:this.creador,
            limite:this.pageSize,
            pagina:this.pageIndex,
           }

          if(tag2.limite===undefined)tag2.limite=10

          if(tag2.pagina===undefined)tag2.pagina=0

           this.tagSubscription = this.tagsService
             .getAllTagsByCreador(tag2)
            .subscribe((result) => {
               this.listaTagTable = result;
               this.prefiltro="creador"
            });

          break;

          case "created_at":
            let ta={
              limite:this.pageSize,
              pagina:this.pageIndex,
              fechaCreacion:new Date(this.fecha).toISOString().slice(0,10),
             }

             if(ta.limite===undefined)ta.limite=10

             if(ta.pagina===undefined)ta.pagina=0

              this.tagSubscription = this.tagsService
                .getAllTagbyFeCr(ta)
               .subscribe((result) => {
                  this.listaTagTable = result;
                  this.prefiltro="created_at"
               });



            break;


            case "todos":
              let ta3={
                limite:this.pageSize,
                pagina:this.pageIndex,
               }

              if(ta3.limite===undefined)ta3.limite=10

              if(ta3.pagina===undefined)ta3.pagina=0

              this.tagSubscription =this.tagsService.getAllTags(ta3).subscribe((result)=>{

                this.listaTagTable = result;
                this.prefiltro="todos"
              })


              break;
              let ta4={
                limite:this.pageSize,
                pagina:this.pageIndex,
               }

              if(ta4.limite===undefined)ta4.limite=10

              if(ta4.pagina===undefined)ta4.pagina=0

              this.tagSubscription =this.tagsService.getAllTags(ta4).subscribe((result)=>{

                this.listaTagTable = result;
                this.prefiltro="todos"
              })

         break;
     }







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
        this.prefiltro="nombre"
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
        this.prefiltro="created_at"
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
        this.prefiltro="creador"
     });
  }
}
