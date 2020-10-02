import { TestBed } from '@angular/core/testing';

import { UggService } from './ugg.service';

describe('UggService', () => {
  let service: UggService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UggService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
