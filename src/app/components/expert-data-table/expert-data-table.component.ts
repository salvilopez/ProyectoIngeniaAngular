import { AfterViewInit, Component, ViewChild ,Input} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ExpertRequest } from 'src/app/models/expert/expert-request.model';
import { Expert } from 'src/app/models/expert/expert.model';
import { ExpertDataTableDataSource, ExpertDataTableItem } from './expert-data-table-datasource';

@Component({
  selector: 'app-expert-data-table',
  templateUrl: './expert-data-table.component.html',
  styleUrls: ['./expert-data-table.component.scss']
})
export class ExpertDataTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ExpertRequest>;
  @Input() expertList:any=[];
  dataSource: ExpertDataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor() {
    this.dataSource = new ExpertDataTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
function input() {
  throw new Error('Function not implemented.');
}

