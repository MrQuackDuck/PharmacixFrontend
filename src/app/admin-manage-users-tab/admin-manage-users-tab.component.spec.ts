import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageUsersTabComponent } from './admin-manage-users-tab.component';

describe('AdminManageUsersTabComponent', () => {
  let component: AdminManageUsersTabComponent;
  let fixture: ComponentFixture<AdminManageUsersTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminManageUsersTabComponent]
    });
    fixture = TestBed.createComponent(AdminManageUsersTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
