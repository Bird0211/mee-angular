import { TestBed } from '@angular/core/testing';

import { BizServiceService } from './biz-service.service';

describe('BizServiceService', () => {
  let service: BizServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BizServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
