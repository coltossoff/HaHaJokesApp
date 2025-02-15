import { TestBed } from '@angular/core/testing';

import { JokesApiService } from './jokes-api.service';

describe('JokesApiService', () => {
  let service: JokesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JokesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
