import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminPanelGuard } from './admin-panel.guard';

describe('adminPanelGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminPanelGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
