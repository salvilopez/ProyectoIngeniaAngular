import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteTagComponent } from './dialog-delete-tag.component';

describe('DialogDeleteTagComponent', () => {
  let component: DialogDeleteTagComponent;
  let fixture: ComponentFixture<DialogDeleteTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
