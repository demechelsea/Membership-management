import { TestBed } from '@angular/core/testing';

import { SmsHistoryService } from './smsHistory.service';

describe('SmsHistoryService', () => {
  let service: SmsHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmsHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
