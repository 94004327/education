import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTeacherByspecialiteComponent } from './search-teacher-byspecialite.component';

describe('SearchTeacherByspecialiteComponent', () => {
  let component: SearchTeacherByspecialiteComponent;
  let fixture: ComponentFixture<SearchTeacherByspecialiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTeacherByspecialiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTeacherByspecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
