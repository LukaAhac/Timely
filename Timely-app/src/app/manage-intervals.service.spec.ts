import { TestBed } from '@angular/core/testing';

import { ManageIntervalsService } from './manage-intervals.service';

describe('ManageIntervalsService', () => {
  let service: ManageIntervalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageIntervalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
