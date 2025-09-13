import { TestBed } from '@angular/core/testing';

import { Accecibility } from './accecibility';

describe('Accecibility', () => {
  let service: Accecibility;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Accecibility);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
