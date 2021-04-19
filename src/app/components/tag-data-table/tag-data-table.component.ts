import { DoCheck, Input } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { TagRequest } from 'src/app/models/tag/tag-request.model';
import { Tag } from 'src/app/models/tag/tag.model';
import { TagsService } from 'src/app/services/tag/tags.service';

@Component({
  selector: 'app-tag-data-table',
  templateUrl: './tag-data-table.component.html',
  styleUrls: ['./tag-data-table.component.scss']
})
export class TagDataTableComponent implements DoCheck {
  displayedColumns: string[] = ['etiqueta', 'creador', 'fechaCreacion'];
  dataSource: MatTableDataSource<Tag>;

  @Input() listaTagTable: any = [];

  tagSubscription: Subscription = new Subscription();;
  tagRequest: TagRequest = new TagRequest('',0, 0,);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private tagsService: TagsService
  ) {
    // Create 100 users
    //const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.listaTagTable);
  }
  ngDoCheck(): void {
    this.dataSource = this.listaTagTable;


  localStorage.setItem('totalTags',this.listaTagTable.length);
  }

  ngOnInit(): void {
  }


  applyFilterByName(event: Event) {
  //  const filterValue = (event.target as HTMLInputElement).value;
   // this.expertRequest.nombre = filterValue;
   // this.expertSubscription = this.expertsService
   //   .getAllExpertsByName(this.expertRequest)
   //   .subscribe((result) => {
   //     this.listaExpertTable = result;
   //   });
  }
}
