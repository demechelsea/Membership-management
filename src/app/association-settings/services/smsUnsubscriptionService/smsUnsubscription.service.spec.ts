import { TestBed } from '@angular/core/testing';

import { SMSUnsubscriptionService } from './smsUnsubscription.service';

describe('SMSUnsubscriptionService', () => {
  let service: SMSUnsubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SMSUnsubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
