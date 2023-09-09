import { TestBed } from '@angular/core/testing';

import { AssocationAttachmentService } from './assocationAttachment.service';

describe('AssocationAttachmentService', () => {
  let service: AssocationAttachmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssocationAttachmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
