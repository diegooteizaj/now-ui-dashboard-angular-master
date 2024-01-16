import { TestBed } from '@angular/core/testing';

import { ApiLineaService } from './api-linea.service';

describe('ApiLineaService', () => {
  let service: ApiLineaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiLineaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
