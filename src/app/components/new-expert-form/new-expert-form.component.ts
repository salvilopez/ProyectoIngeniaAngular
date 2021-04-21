import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Subscription } from 'rxjs';
import { Expert } from 'src/app/models/expert/expert.model';
import { Tag } from 'src/app/models/tag/tag.model';
import { ExpertService } from 'src/app/services/expert/expert.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Router } from '@angular/router';

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
    private formBuilder: FormBuilder,
    private router:Router
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
      this.listaTags!==[]

    ) {
     let experto:Expert= new Expert(this.addExpertForm.value.nombre,new Date(),new Date(),this.addExpertForm.value.nif,this.addExpertForm.value.disponibilidad,"",false,this.addExpertForm.value.contacto_telefono,this.addExpertForm.value.contacto_email,this.addExpertForm.value.contacto_ciudad,this.addExpertForm.value.contacto_linkedin,0,0,0,this.addExpertForm.value.nif,this.addExpertForm.value.contacto_email,"","","","","","","","pendiente")
     experto.tagList= this.listaTags

    this.expertSubscription = this.expertService.createExpert(experto).subscribe((result)=>{
    })
    }
    this.router.navigate(['/expertos']);
  }
addTag(event: any): void {
  const value = event.target.value;
  if(value!=""){
  let nomCreador:any=localStorage.getItem("username");

  let tagnuevo ={

  }
let tag1:Tag = new Tag(value,new Date(),nomCreador,new Date())

let nombreTag=value.toString()

let nuevaEtiqueta = {
  id: undefined,
  nombre:nombreTag,
  creador:nomCreador,
  created_at: new Date()  ,
  updated_at:new Date() ,
  expertList:undefined,
};
  if ((value || '').trim()) {
    this.listaTags.push(nuevaEtiqueta);
  }
}
}
}
