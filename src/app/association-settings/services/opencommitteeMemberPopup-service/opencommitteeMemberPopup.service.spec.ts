import { TestBed } from '@angular/core/testing';

import { opencommitteeMemberPopupService } from './opencommitteeMemberPopup.service';

describe('opencommitteeMemberPopupService', () => {
  let service: opencommitteeMemberPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(opencommitteeMemberPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
