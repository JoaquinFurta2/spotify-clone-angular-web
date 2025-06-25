import { Component, inject, input, signal } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Playlist } from '../../models/data.model';

@Component({
  selector: 'app-play-button',
  imports: [],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.scss'
})
export class PlayButtonComponent {
  cardData = input.required<Playlist>()
  playerService = inject(PlayerService)
  isPlayingLocal = signal(false)

  
 onClick(e:MouseEvent) {
    e.stopPropagation()
    const currPlaylistId = this.playerService.getCurrentPlaylistId()
    const currPlaylist = this.playerService.currentPlaylist
    const isPlaying = this.playerService.isPlaying

    if ( currPlaylistId != this.cardData().id) {
      currPlaylist.set(this.cardData())
      this.playerService.$currentSongData
      isPlaying.set(true)
    } else {
      isPlaying.update((prev)=> !prev)
    }
  }

}
