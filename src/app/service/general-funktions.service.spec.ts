import { TestBed } from '@angular/core/testing';

import { GeneralFunktionsService } from './general-funktions.service';

describe('GeneralFunktionsService', () => {
  let service: GeneralFunktionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralFunktionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
