import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, input, signal, viewChild } from '@angular/core';
import { LibCard, Playlist } from '../../models/data.model';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ElementRef } from '@angular/core';
import { OverflowTranslateDirective } from '../../directives/detect-overflow.directive';
import { hoverColorService } from '../../services/hover-color.service';
import { PlayerService } from '../../services/player.service';



@Component({
  selector: 'app-library-card',
  imports: [NgOptimizedImage, CdkOverlayOrigin, CdkConnectedOverlay, OverflowTranslateDirective],
  templateUrl: './library-card.component.html',
  styleUrl: './library-card.component.scss'
})
export class LibraryCardComponent {
  playerService = inject(PlayerService)
  hService = inject(hoverColorService)
  cardData = input.required<Playlist>()
  cardCont = viewChild.required<ElementRef<HTMLDivElement>>('cardCont')

  playClicked = signal(false)
  isHover = signal(false)
  
   onClick(e:MouseEvent) {
    e.stopPropagation()
    const currPlaylistId = this.playerService.getCurrentPlaylistId()
    const currPlaylist = this.playerService.currentPlaylist
    const isPlaying = this.playerService.isPlaying

    if ( currPlaylistId != this.cardData().id) {
      currPlaylist.set(this.cardData())
      isPlaying.set(true)
    } else {
      isPlaying.update((prev)=> !prev)
    }
  }
  
  getWidth() {
     const width = this.cardCont().nativeElement.offsetWidth
     width <= 100 ? this.isHover.set(true) : this.isHover.set(false)
  }
   
}
