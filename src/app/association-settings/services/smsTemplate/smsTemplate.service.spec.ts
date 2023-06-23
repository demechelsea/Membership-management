import { TestBed } from '@angular/core/testing';

import { SmsTemplateService } from './smsTemplate.service';

describe('SmsTemplateService', () => {
  let service: SmsTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmsTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
