import { TestBed } from '@angular/core/testing';

import { GetDishService } from './get-dish.service';

describe('GetDishService', () => {
  let service: GetDishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
