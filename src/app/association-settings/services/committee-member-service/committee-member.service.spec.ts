import { TestBed } from '@angular/core/testing';

import { CommitteeMemberService } from './committee-member.service';

describe('CommitteeService', () => {
  let service: CommitteeMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommitteeMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
