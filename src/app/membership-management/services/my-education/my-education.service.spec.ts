import { TestBed } from '@angular/core/testing';

import { MyEducationService } from './my-education.service';

describe('MyEducationService', () => {
  let service: MyEducationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyEducationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
