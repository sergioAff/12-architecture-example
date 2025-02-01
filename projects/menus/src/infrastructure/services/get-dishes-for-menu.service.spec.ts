import { TestBed } from '@angular/core/testing';

import { GetDishesForMenuService } from './get-dishes-for-menu.service';

describe('GetDishesForMenuService', () => {
  let service: GetDishesForMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDishesForMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
