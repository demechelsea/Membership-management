import { TestBed } from '@angular/core/testing';

import { SoraxAuthGuard } from './sorax-auth-guard.service';

describe('AuthGuardService', () => {
  let service: SoraxAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoraxAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
