import { DoCheck } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Expert } from 'src/app/models/expert/expert.model';
import { ExpertService } from 'src/app/services/expert/expert.service';

@Component({
  selector: 'app-expert-details-page',
  templateUrl: './expert-details-page.component.html',
  styleUrls: ['./expert-details-page.component.scss'],
})
export class ExpertDetailsPageComponent  {
tabLoadTimes: Date[] = [];
  routerSubscription: Subscription = new Subscription();
  expertSubscription: Subscription = new Subscription();
  expertDet: any=[];
  id:number=0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private expertService: ExpertService
  ) {}
  ngDoCheck(): void {






  }

  ngOnInit(): void {
    this.routerSubscription = this.activatedRoute.params.subscribe((params) => {
      this.id=  params.id

    });

    this.expertSubscription = this.expertService
    .getExpertsById(this.id)
    .subscribe((data: Expert) => {
      this.expertDet.push(data);
      console.log(this.expertDet);
    });


  }

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }

  ngOnDestroy(): void {
    this.expertSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }
}
