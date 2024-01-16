import { TestBed } from '@angular/core/testing';

import { ApiDuctosService } from './api-ductos.service';

describe('ApiDuctosService', () => {
  let service: ApiDuctosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDuctosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
