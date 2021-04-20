import { Component, Input, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tag } from 'src/app/models/tag/tag.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss']
})
export class GeneralDataComponent implements OnInit {
@Input () expertDetail:any
visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor() { }

  ngOnInit(): void {
    console.log(this.expertDetail)

  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {

      let tag=new Tag(value.trim(),new Date(),"salvi@gmail.com",new Date())
      this.expertDetail.tagList.push(tag);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tag): void {
    const index = this.expertDetail.tagList.indexOf(tag);

    if (index >= 0) {
      this.expertDetail.tagList.splice(index, 1);
    }
  }
}
