import { TestBed } from '@angular/core/testing';

import { CategotiesService } from './categoties.service';

describe('CategotiesService', () => {
  let service: CategotiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategotiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
