import { TestBed } from '@angular/core/testing';

import { AvisosMockService } from './avisos.mock.service';

describe('AvisosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvisosMockService = TestBed.get(AvisosMockService);
    expect(service).toBeTruthy();
  });
});
