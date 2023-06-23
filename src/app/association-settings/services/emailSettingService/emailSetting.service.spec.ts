import { TestBed } from '@angular/core/testing';

import { EmailSettingService } from './emailSetting.service';

describe('EmailSettingService', () => {
  let service: EmailSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
