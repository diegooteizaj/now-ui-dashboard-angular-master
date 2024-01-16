import { TestBed } from '@angular/core/testing';

import { ApiMedicionService } from './api-medicion.service';

describe('ApiMedicionService', () => {
  let service: ApiMedicionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMedicionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
