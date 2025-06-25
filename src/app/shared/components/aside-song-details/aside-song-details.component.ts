import { Component, computed, inject, output, signal } from '@angular/core';
import { AsideService } from '../../services/aside.service';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { PlayerService } from '../../services/player.service';
import { BreakPointService} from '../../services/breakpoint.service';

@Component({
  selector: 'app-aside-song-details',
  imports: [NgOptimizedImage, AsyncPipe],
  templateUrl: './aside-song-details.component.html',
  styleUrl: './aside-song-details.component.scss'
})
export class AsideSongDetailsComponent {
  
  asideService = inject(AsideService)
  playerService = inject(PlayerService)
  breakpointService = inject(BreakPointService)
  isLoading = signal(true)


  handleSongDetailsButton() {
    if(this.breakpointService.isLessThan1150px()) {
       this.asideService.close('libAside')   
    }
    this.asideService.open('songAside')
}

}

