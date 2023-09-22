import { TestBed } from '@angular/core/testing';

import { MyfamilyService } from './my-family.service';

describe('MyfamilyService', () => {
  let service: MyfamilyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyfamilyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
