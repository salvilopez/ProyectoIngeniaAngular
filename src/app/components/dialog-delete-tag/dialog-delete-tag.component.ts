import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TagsService } from 'src/app/services/tag/tags.service';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Tag } from 'src/app/models/tag/tag.model';
@Component({
  selector: 'app-dialog-delete-tag',
  templateUrl: './dialog-delete-tag.component.html',
  styleUrls: ['./dialog-delete-tag.component.scss']
})
export class DialogDeleteTagComponent implements OnInit , OnDestroy {

  tagSubscription: Subscription = new Subscription();
  numero:any;
  tag:any;
  dataSource = new MatTableDataSource();
  constructor(
    private formBuilder: FormBuilder,private tagService: TagsService,private router: Router,public dialogRef: MatDialogRef<DialogDeleteTagComponent>,private location: Location,
    @Inject(MAT_DIALOG_DATA) public data:{tag:string}
    ){}
  ngOnDestroy(): void {
    this.tagSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.tag=JSON.parse(this.data.tag)


  }
  reloadCurrentRoute() {
    this.router
     .navigateByUrl('/etiquetas', { skipLocationChange: true })
     .then(() => this.router.navigate(['/etiquetas']));
     window.location.reload();

   }

  closeDialog() {
    this.dialogRef.close();
  }


  deleteTag() {

    this.tagSubscription=this.tagService.deleteTag(this.tag.id).subscribe(
      (response) => {
        this.reloadCurrentRoute();
        this.closeDialog();
      },
      (error) => {

    } );

  }

}
