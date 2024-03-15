import { TestBed } from '@angular/core/testing';

import { MedicamentRepositoryService } from './medicament-repository.service';

describe('MedicamentRepositoryService', () => {
  let service: MedicamentRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicamentRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
