import { TestBed } from '@angular/core/testing';

import { MeeProductService } from './mee-product.service';

describe('MeeProductService', () => {
  let service: MeeProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeeProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
