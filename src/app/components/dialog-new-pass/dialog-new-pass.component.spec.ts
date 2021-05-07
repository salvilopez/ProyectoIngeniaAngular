import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewPassComponent } from './dialog-new-pass.component';

describe('DialogNewPassComponent', () => {
  let component: DialogNewPassComponent;
  let fixture: ComponentFixture<DialogNewPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
