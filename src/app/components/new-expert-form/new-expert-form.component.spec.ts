import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExpertFormComponent } from './new-expert-form.component';

describe('NewExpertFormComponent', () => {
  let component: NewExpertFormComponent;
  let fixture: ComponentFixture<NewExpertFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewExpertFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExpertFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
