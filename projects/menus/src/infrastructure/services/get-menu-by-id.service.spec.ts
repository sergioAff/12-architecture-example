import { TestBed } from '@angular/core/testing';

import { GetMenuByIdService } from './get-menu-by-id.service';

describe('GetMenuByIdService', () => {
  let service: GetMenuByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMenuByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
