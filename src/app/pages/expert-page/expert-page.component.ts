import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expert-page',
  templateUrl: './expert-page.component.html',
  styleUrls: ['./expert-page.component.scss']
})
export class ExpertPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }


  procesaPropagar(event:any) {
    alert(event)
  }
}
