import { NgOptimizedImage } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { BigItemCard, Playlist } from '../../models/data.model';
import { OverflowTranslateDirective } from '../../directives/detect-overflow.directive';
import { hoverColorService } from '../../services/hover-color.service';
import { PlayerService } from '../../services/player.service';
import { PlayButtonComponent } from "../play-button/play-button.component";
import { single } from 'rxjs';
@Component({
  selector: 'app-playlist-card',
  imports: [NgOptimizedImage, OverflowTranslateDirective, PlayButtonComponent],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss'
})
export class PlaylistCardComponent {
  playerService= inject(PlayerService)
  hService = inject(hoverColorService)
  cardData = input.required<Playlist>()
  isLoading = signal(true)


  onClick(e:MouseEvent) {
    e.stopPropagation()
    this.playerService.currentPlaylist.set(this.cardData())
    this.playerService.isPlaying.update((prev)=> !prev)
  }

}
