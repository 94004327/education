import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalutionFormComponent } from './evalution-form.component';

describe('EvalutionFormComponent', () => {
  let component: EvalutionFormComponent;
  let fixture: ComponentFixture<EvalutionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvalutionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalutionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
