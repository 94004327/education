import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursStudentComponent } from './cours-student.component';

describe('CoursStudentComponent', () => {
  let component: CoursStudentComponent;
  let fixture: ComponentFixture<CoursStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
