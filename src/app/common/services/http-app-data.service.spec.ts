import { TestBed } from '@angular/core/testing';

import { HttpAppDataService } from './http-app-data.service';

describe('HttpAppDataService', () => {
  let service: HttpAppDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpAppDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
