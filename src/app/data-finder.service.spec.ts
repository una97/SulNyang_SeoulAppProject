import { TestBed } from '@angular/core/testing';

import { DataFinderService } from './data-finder.service';

describe('DataFinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataFinderService = TestBed.get(DataFinderService);
    expect(service).toBeTruthy();
  });
});
