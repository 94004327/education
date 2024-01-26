import { TestBed } from '@angular/core/testing';

import { EvalutionService } from './evalution.service';

describe('EvalutionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvalutionService = TestBed.get(EvalutionService);
    expect(service).toBeTruthy();
  });
});
