import { TestBed } from '@angular/core/testing';

import { GetAllCustomerService } from './get-all-customer.service';

describe('GetAllCustomerService', () => {
  let service: GetAllCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
