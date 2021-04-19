import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss']
})
export class GeneralDataComponent implements OnInit {
@Input () expertDetail:any
  constructor() { }

  ngOnInit(): void {
   this.expertDetail
  }

}
