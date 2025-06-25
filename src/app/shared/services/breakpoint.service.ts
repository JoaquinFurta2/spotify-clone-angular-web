import { inject, Injectable} from "@angular/core";
import {BreakpointObserver} from '@angular/cdk/layout';
import { map } from "rxjs";
import {toSignal} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'})
export class BreakPointService {
  private breakpointObserver = inject(BreakpointObserver)  

  isMobile = toSignal(
    this.breakpointObserver.observe('(max-width: 649px)')
      .pipe(
        map(x => x.matches)
      )
  ) 

  isLessThan1150px = toSignal(
    this.breakpointObserver.observe('(max-width: 1149px)')
      .pipe(
        map(x => x.matches)
      )
  ) 
 }