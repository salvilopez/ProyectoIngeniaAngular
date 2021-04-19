import { Component, Input, OnInit } from '@angular/core';
import { Expert } from 'src/app/models/expert/expert.model';

@Component({
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss']
})
export class ObservationsComponent implements OnInit {
  @Input () expertDetail:any
  constructor() { }

  ngOnInit(): void {
    console.log(this.expertDetail)
  }

}
