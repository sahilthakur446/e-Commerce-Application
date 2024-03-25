import { TestBed } from '@angular/core/testing';

import { ProductShowcaseService } from './product-showcase.service';

describe('ProductShowcaseService', () => {
  let service: ProductShowcaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductShowcaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
