import { Component,computed,ElementRef,inject, OnInit, output, signal, viewChild } from '@angular/core';
import { LibraryCardComponent } from "../library-card/library-card.component";
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { AsideService } from '../../services/aside.service';
import { AsyncPipe } from '@angular/common';
import { BreakPointService } from '../../services/breakpoint.service';

@Component({
  selector: 'app-library',
  imports: [LibraryCardComponent, CdkConnectedOverlay, CdkOverlayOrigin, AsyncPipe],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {
  libClicked = output<boolean>()

  text1 = "Collapse Your Library"
  text2 = "Open Your Library"

  asideService = inject(AsideService)
  dataService = inject(DataService)
  router = inject(Router)
  breakpointService = inject(BreakPointService)

  changeLibIcon = signal(false)


  readonly playlist$ = this.dataService.getPlaylists()

  isHover = signal(false)
  hoverAnimation = signal(false)
  
  triggerOnHoverAnimation() {
     this.isHover.set(true)
      setTimeout(() => {
      this.hoverAnimation.set(true);
    }, 200);
  }

  triggerOffHoverAnimation() {
      this.hoverAnimation.set(false);
      setTimeout(() => {
       this.isHover.set(false)
    }, 200);
  }

  navigate(id:string) {
    this.router.navigate(['/playlist', id])
  }
  handleLibClick() {
    if (this.breakpointService.isLessThan1150px()) {
         this.asideService.close('songAside')
    } 
    
     this.asideService.toggle('libAside')
  }
  

}
