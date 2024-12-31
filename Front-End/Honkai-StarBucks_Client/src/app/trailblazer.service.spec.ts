import { TestBed } from '@angular/core/testing';

import { TrailblazerService } from './trailblazer.service';

describe('TrailblazerService', () => {
  let service: TrailblazerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrailblazerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
