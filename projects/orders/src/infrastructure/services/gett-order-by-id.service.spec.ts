import { TestBed } from '@angular/core/testing';

import { GettOrderByIdService } from './gett-order-by-id.service';

describe('GettOrderByIdService', () => {
  let service: GettOrderByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GettOrderByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
