import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagDetailsPageComponent } from './tag-details-page.component';

describe('TagDetailsPageComponent', () => {
  let component: TagDetailsPageComponent;
  let fixture: ComponentFixture<TagDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagDetailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
