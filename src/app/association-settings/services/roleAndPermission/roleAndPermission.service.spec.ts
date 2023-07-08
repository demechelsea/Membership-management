import { TestBed } from '@angular/core/testing';

import { RoleAndPermissionService } from './roleAndPermission.service';

describe('RoleAndPermissionService', () => {
  let service: RoleAndPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleAndPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
