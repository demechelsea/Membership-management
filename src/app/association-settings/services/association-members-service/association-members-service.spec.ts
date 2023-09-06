import { TestBed } from '@angular/core/testing';

import { AssociationMembersService } from './association-members-service';

describe('AssociationMembersService', () => {
  let service: AssociationMembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociationMembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
