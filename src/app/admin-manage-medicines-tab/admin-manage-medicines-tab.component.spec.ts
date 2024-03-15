import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageMedicinesTabComponent } from './admin-manage-medicines-tab.component';

describe('AdminManageMedicinesTabComponent', () => {
  let component: AdminManageMedicinesTabComponent;
  let fixture: ComponentFixture<AdminManageMedicinesTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminManageMedicinesTabComponent]
    });
    fixture = TestBed.createComponent(AdminManageMedicinesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
