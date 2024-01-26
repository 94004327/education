import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCouresByTelComponent } from './search-coures-by-tel.component';

describe('SearchCouresByTelComponent', () => {
  let component: SearchCouresByTelComponent;
  let fixture: ComponentFixture<SearchCouresByTelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCouresByTelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCouresByTelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
