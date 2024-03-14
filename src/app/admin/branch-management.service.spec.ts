import { TestBed } from '@angular/core/testing';

import { BranchManagementService } from './branch-management.service';

describe('BranchManagementService', () => {
  let service: BranchManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
