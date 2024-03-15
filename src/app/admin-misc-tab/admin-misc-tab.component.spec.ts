import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMiscTabComponent } from './admin-misc-tab.component';

describe('AdminMiscTabComponent', () => {
  let component: AdminMiscTabComponent;
  let fixture: ComponentFixture<AdminMiscTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMiscTabComponent]
    });
    fixture = TestBed.createComponent(AdminMiscTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
