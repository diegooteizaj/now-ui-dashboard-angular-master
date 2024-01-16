import { TestBed } from '@angular/core/testing';

import { ApiTipoMaterialService } from './api-tipo-material.service';

describe('ApiTipoMaterialService', () => {
  let service: ApiTipoMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTipoMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
