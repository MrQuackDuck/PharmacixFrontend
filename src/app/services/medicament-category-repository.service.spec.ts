import { TestBed } from '@angular/core/testing';

import { MedicamentCategoryRepositoryService } from './medicament-category-repository.service';

describe('MedicamentCategoryRepositoryService', () => {
  let service: MedicamentCategoryRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicamentCategoryRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
