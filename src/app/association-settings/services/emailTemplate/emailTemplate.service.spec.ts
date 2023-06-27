import { TestBed } from '@angular/core/testing';

import { EmailTemplateService } from './emailTemplate.service';

describe('EmailTemplateService', () => {
  let service: EmailTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
