import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertsPageComponent } from './experts-page.component';

describe('ExpertsPageComponent', () => {
  let component: ExpertsPageComponent;
  let fixture: ComponentFixture<ExpertsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
