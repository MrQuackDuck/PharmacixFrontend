import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageMedicamentCategoriesTabComponent } from './admin-manage-medicament-categories-tab.component';

describe('AdminManageMedicamentCategoriesTabComponent', () => {
  let component: AdminManageMedicamentCategoriesTabComponent;
  let fixture: ComponentFixture<AdminManageMedicamentCategoriesTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminManageMedicamentCategoriesTabComponent]
    });
    fixture = TestBed.createComponent(AdminManageMedicamentCategoriesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
