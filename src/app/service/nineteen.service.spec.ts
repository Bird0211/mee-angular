import { TestBed } from '@angular/core/testing';

import { NineteenService } from './nineteen.service';

describe('NineteenService', () => {
  let service: NineteenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NineteenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
