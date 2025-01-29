import { TestBed } from '@angular/core/testing';

import { CreateReservationService } from './create-reservation.service';

describe('CreateReservationService', () => {
  let service: CreateReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
