import { Component, inject} from '@angular/core';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { AsideNavComponent } from './shared/components/aside-nav/aside-nav.component';
import { MainContainerComponent } from './shared/components/main-container/main-container.component';

import { PlayerComponent } from './shared/components/player/player.component';
import {DragDropModule} from  '@angular/cdk/drag-drop'
import { LibraryComponent } from "./shared/components/library/library.component";
import { AsideSongDetailsComponent } from './shared/components/aside-song-details/aside-song-details.component';
import { BreakPointService} from './shared/services/breakpoint.service';
import { interval } from 'rxjs';
import { AsideService } from './shared/services/aside.service';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, AsideNavComponent, MainContainerComponent, PlayerComponent, DragDropModule, LibraryComponent, AsideSongDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'spotify-lite';
  breakpointService = inject(BreakPointService)
  asideService = inject(AsideService)
  
  ngAfterViewInit() {
    if (this.breakpointService.isLessThan1150px()) {
      this.asideService.close('libAside')
    }
  }

    
}

