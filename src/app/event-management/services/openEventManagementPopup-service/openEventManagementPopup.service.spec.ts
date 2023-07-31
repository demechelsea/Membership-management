import { TestBed } from '@angular/core/testing';

import { openEventManagementPopupService } from './opencommitteeMemberPopup.service';

describe('opencommitteeMemberPopupService', () => {
  let service: openEventManagementPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(openEventManagementPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
