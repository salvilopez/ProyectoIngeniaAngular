import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tag } from 'src/app/models/tag/tag.model';
import { TagsService } from 'src/app/services/tag/tags.service';
@Component({
  selector: 'app-dialog-add-tag',
  templateUrl: './dialog-add-tag.component.html',
  styleUrls: ['./dialog-add-tag.component.scss']
})
export class DialogAddTagComponent implements OnInit , OnDestroy {
  addTagForm: FormGroup = new FormGroup({});
  tagSubscription: Subscription = new Subscription();
  constructor(
    private location:Location,
    private formBuilder: FormBuilder,private tagService: TagsService,private router: Router,public dialogRef: MatDialogRef<DialogAddTagComponent>){}
  ngOnDestroy(): void {
    this.tagSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.addTagForm = this.formBuilder.group({
      nombreEtiqueta: ['', Validators.compose([Validators.required])],
    });
  }
  get nombrerequerido(){
    return this.addTagForm.get('nombreEtiqueta')?.invalid && this.addTagForm.get('nombreEtiqueta')?.touched;
  }
  closeDialog() {
    this.dialogRef.close();
  }
  addTag() {
    if (
      this.addTagForm.valid &&
      this.addTagForm.value.nombreEtiqueta
    ) {
      let nomCreador:any=localStorage.getItem("username");

      let tag: Tag = new Tag(this.addTagForm.value.nombreEtiqueta,new Date(),nomCreador,new Date());
      console.log(tag);
      this.tagSubscription = this.tagService.createTags(tag).subscribe(
        (response) => {
          if (response) {



          }
        },
        (error) => {
          if(error){


          }

        }
      );
    }
    this.closeDialog();
    this.reloadCurrentRoute();
  }
  reloadCurrentRoute() {
   // this.router.navigateByUrl('/etiquetas', {skipLocationChange: true}).then(()=>
   // this.router.navigate(["/etiquetas"]));
    this.location.reload();
}

}
