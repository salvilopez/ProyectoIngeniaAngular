import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tag } from 'src/app/models/tag/tag.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ExpertService } from 'src/app/services/expert/expert.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Expert } from 'src/app/models/expert/expert.model';
@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss'],
})
export class GeneralDataComponent implements OnInit ,DoCheck{
  @Input() expertDetail: any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  expDetail :any;
  expActualizado :any;
  selected: string = '';
  expertSubscription: Subscription = new Subscription();

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(private expertService: ExpertService) {
  }
  ngDoCheck(): void {
    if(this.expertDetail!=undefined){
      this.expDetail=this.expertDetail;
    }
    if(this.expActualizado!==undefined){
      this.expDetail=this.expDetail;
      this.expActualizado=undefined;
    }
  }

  ngOnInit(): void {

  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      let tag = new Tag(
        value.trim(),
        new Date(),
        'salvi@gmail.com',
        new Date()
      );
      this.expDetail.tagList.push(tag);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  actualizarExperto() {
    let body={
      ...this.expDetail
    }
    console.log("--------------------")
    console.log("antes del update");
    console.log(body)
    console.log("--------------------")
    this.expertService.updateExpert(body).subscribe((response) => {
      this.expActualizado = response;
      console.log("--------------------")
      console.log("depues del update");
      console.log(this.expActualizado)
      console.log("--------------------")
    });
  }
  remove(tag: Tag): void {
    const index = this.expDetail.tagList.indexOf(tag);

    if (index >= 0) {
      this.expDetail.tagList.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this.expertSubscription.unsubscribe();
  }
}
