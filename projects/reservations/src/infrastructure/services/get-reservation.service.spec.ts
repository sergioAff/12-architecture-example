import { TestBed } from '@angular/core/testing';

import { GetReservationService } from './get-reservation.service';

describe('GetReservationService', () => {
  let service: GetReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
