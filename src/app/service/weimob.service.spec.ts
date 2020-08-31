import { TestBed } from '@angular/core/testing';

import { WeimobService } from './weimob.service';

describe('WeimobService', () => {
  let service: WeimobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeimobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
