import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExpertPageComponent } from './new-expert-page.component';

describe('NewExpertPageComponent', () => {
  let component: NewExpertPageComponent;
  let fixture: ComponentFixture<NewExpertPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewExpertPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExpertPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
