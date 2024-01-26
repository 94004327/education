import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCoursComponent } from './display-cours.component';

describe('DisplayCoursComponent', () => {
  let component: DisplayCoursComponent;
  let fixture: ComponentFixture<DisplayCoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayCoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
