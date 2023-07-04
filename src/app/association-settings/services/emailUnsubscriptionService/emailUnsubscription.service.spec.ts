import { TestBed } from '@angular/core/testing';

import { EmailUnsubscriptionService } from './emailUnsubscription.service';

describe('EmailUnsubscriptionService', () => {
  let service: EmailUnsubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailUnsubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
