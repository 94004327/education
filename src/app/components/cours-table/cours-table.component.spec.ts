import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursTableComponent } from './cours-table.component';

describe('CoursTableComponent', () => {
  let component: CoursTableComponent;
  let fixture: ComponentFixture<CoursTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
