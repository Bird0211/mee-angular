import { TestBed } from '@angular/core/testing';

import { NzPostConfigService } from './nz-post-config.service';

describe('NzPostConfigService', () => {
  let service: NzPostConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NzPostConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
