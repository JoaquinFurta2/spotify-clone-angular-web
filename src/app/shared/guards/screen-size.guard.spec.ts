import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { screenSizeGuard } from './screen-size.guard';

describe('screenSizeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => screenSizeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
