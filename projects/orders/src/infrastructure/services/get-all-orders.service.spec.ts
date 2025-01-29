import { TestBed } from '@angular/core/testing';

import { GetAllOrdersService } from './get-all-orders.service';

describe('GetAllOrdersService', () => {
  let service: GetAllOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
