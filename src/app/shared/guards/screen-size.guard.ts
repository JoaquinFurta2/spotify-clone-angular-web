import { CanActivateFn } from '@angular/router';
import { BreakPointService } from '../services/breakpoint.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const screenSizeGuard: CanActivateFn = (route, state) => {

  const isMobile = inject(BreakPointService)
  const router = inject(Router)

  if (isMobile.isMobile())  {
    return true
  } else {
    router.navigate(['/']);
    return false
  }
}
