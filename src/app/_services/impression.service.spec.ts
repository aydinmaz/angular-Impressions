import { TestBed } from '@angular/core/testing';

import { ImpressionService } from './impression.service';

describe('ImpressionService', () => {
  let service: ImpressionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpressionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
