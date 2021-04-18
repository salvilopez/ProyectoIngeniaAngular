import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertDataTableComponent } from './expert-data-table.component';

describe('ExpertDataTableComponent', () => {
  let component: ExpertDataTableComponent;
  let fixture: ComponentFixture<ExpertDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
