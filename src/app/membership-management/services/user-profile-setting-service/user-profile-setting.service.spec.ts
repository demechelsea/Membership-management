import { TestBed } from '@angular/core/testing';

import { UserProfileSettingService } from './user-profile-setting.service';

describe('UserProfileSettingService', () => {
  let service: UserProfileSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfileSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
