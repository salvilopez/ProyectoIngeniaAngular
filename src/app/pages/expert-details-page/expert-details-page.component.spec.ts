import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertDetailsPageComponent } from './expert-details-page.component';

describe('ExpertDetailsPageComponent', () => {
  let component: ExpertDetailsPageComponent;
  let fixture: ComponentFixture<ExpertDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertDetailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
