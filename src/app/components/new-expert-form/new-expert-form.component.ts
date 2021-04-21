import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Subscription } from 'rxjs';
import { AddExpert } from 'src/app/models/expert/add-expert.model';
import { Expert } from 'src/app/models/expert/expert.model';
import { Tag } from 'src/app/models/tag/tag.model';
import { ExpertService } from 'src/app/services/expert/expert.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-new-expert-form',
  templateUrl: './new-expert-form.component.html',
  styleUrls: ['./new-expert-form.component.scss'],
})
export class NewExpertFormComponent implements OnInit {
  addExpertForm: FormGroup = new FormGroup({});
  listaTags:Tag[]=[]
  expertSubscription: Subscription = new Subscription();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    private expertService: ExpertService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.addExpertForm = this.formBuilder.group({
      nombre:  ['', Validators.required],
      nif:  ['', Validators.required],
      contacto_telefono:  ['', Validators.compose([Validators.required, Validators.pattern("[0-9]{9}")])],
      contacto_email: ['', Validators.compose([Validators.required, Validators.email])],
      contacto_ciudad: ['', Validators.required],
      contacto_linkedin: ['', Validators.required],
      disponibilidad:  ['', Validators.required],
      tagList: ''
    });
  }

  addExpertMethod(): void {
    if (
      this.addExpertForm.valid &&
      this.addExpertForm.value.nombre &&
      this.addExpertForm.value.nif &&
      this.addExpertForm.value.contacto_telefono &&
      this.addExpertForm.value.contacto_email &&
      this.addExpertForm.value.contacto_ciudad &&
      this.addExpertForm.value.contacto_linkedin &&
      this.addExpertForm.value.disponibilidad &&
      this.addExpertForm.value.tagList
    ) {console.log(this.addExpertForm.value)
     let expertF  = new AddExpert(
      this.addExpertForm.value.nombre ,
      this.addExpertForm.value.nif ,
      this.addExpertForm.value.contacto_telefono ,
      this.addExpertForm.value.contacto_email,
      this.addExpertForm.value.contacto_ciudad ,
      this.addExpertForm.value.contacto_linkedin ,
      this.addExpertForm.value.disponibilidad
      );
      expertF.tagList=this.addExpertForm.value.tagList;
      let experto:any;
      experto as Expert;
      experto.nombre=expertF.nombre;
      experto.nif=expertF.nif;
      experto.contacto_telefono=expertF.contacto_telefono;
      experto.contacto_email=expertF.contacto_email;
      experto.contacto_ciudad=expertF.contacto_ciudad;
      experto.contacto_linkedin=expertF.contacto_linkedin;
      experto.disponibilidad=expertF.disponibilidad;
      experto.tagList=this.listaTags

    this.expertSubscription = this.expertService.createExpert(experto).subscribe((result)=>{
      console.log("-------------------------")
      console.log("result")
      console.log(result)
      console.log("-------------------------")
    })
    }
  }
addTag(event: any): void {
  const value = event.target.value;
  if(value!=""){
  let nomCreador:any=localStorage.getItem("username");
let tag:Tag = new Tag(value,new Date(),nomCreador,new Date())
  // Add our fruit
  if ((value || '').trim()) {
    this.listaTags.push(tag);
  }
}
}
}
