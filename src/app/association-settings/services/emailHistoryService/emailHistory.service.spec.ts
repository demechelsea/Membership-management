import { TestBed } from '@angular/core/testing';

import { EmailHistoryService } from './emailHistory.service';

describe('EmailHistoryService', () => {
  let service: EmailHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
