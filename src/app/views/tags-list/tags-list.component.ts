import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Tag } from 'src/app/models/tag/tag.model';
import { TagsService } from 'src/app/services/tag/tags.service';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss'],
})
export class TagsListComponent implements OnInit ,OnDestroy, DoCheck{
  tagList: Tag[] = [];
  listTag: Tag[] = [];
  tagSubscription: Subscription = new Subscription();
  tagResponse: any = {};
  constructor(private tagService: TagsService, private snackBar: MatSnackBar) {}
  ngDoCheck(): void {
    this.listTag=this.tagList

  }

  ngOnInit(): void {
    this.getExperts();
  }
  ngOnDestroy(): void {
this.tagSubscription.unsubscribe();
  }
  getExperts() {
    this.tagSubscription = this.tagService
      .getAllTags(this.tagResponse)
      .subscribe(
        (response) => {
          this.tagList = response;
        },
        (err) => {
          this.snackBar.open(
            'Erroral Traer la lista de Contactos',
            err.message,
            {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
        }
      );
  }
}
