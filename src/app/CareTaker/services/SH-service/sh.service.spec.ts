import { TestBed } from '@angular/core/testing';

import { ShService } from './sh.service';

describe('ShService', () => {
  let service: ShService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
