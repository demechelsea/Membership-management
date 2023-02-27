import { TestBed } from '@angular/core/testing';

import { SoraxHttpInterceptorService } from './sorax-http-interceptor.service';

describe('SoraxHttpInterceptorService', () => {
  let service: SoraxHttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoraxHttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
