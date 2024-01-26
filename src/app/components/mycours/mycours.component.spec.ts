import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycoursComponent } from './mycours.component';

describe('MycoursComponent', () => {
  let component: MycoursComponent;
  let fixture: ComponentFixture<MycoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
