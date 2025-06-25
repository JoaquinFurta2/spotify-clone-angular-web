import { Component, computed, inject, input, signal } from '@angular/core';
import { Playlist, Song } from '../../models/data.model';
import { PlayerService } from '../../services/player.service';
import { FakeEqualizerComponent } from "../fake-equalizer/fake-equalizer.component";
import { NgOptimizedImage } from '@angular/common';
import { BreakPointService } from '../../services/breakpoint.service';

@Component({
  selector: 'app-song-table',
  imports: [FakeEqualizerComponent, NgOptimizedImage],
  templateUrl: './song-table.component.html',
  styleUrl: './song-table.component.scss'
})
export class SongTableComponent {
  isMobileService= inject(BreakPointService)
  playerService = inject(PlayerService)

  songCont = input.required<Song>()
  songIndex = input.required<number>()
  playlist = input.required<Playlist>()

  isCardHover = signal(false)
  onWhichEvent = computed(()=> 
    this.isMobileService.isMobile() ? 'click' : 'dblclick'
  )

  onClickPlaySong() {
    const currentPlaylist = this.playerService.currentPlaylist
    const isPlaying = this.playerService.isPlaying
    const currentPlaylistId = this.playerService.getCurrentPlaylistId()
    const currentSongIndex = this.playerService.currentSongIndex

    if (currentPlaylistId === this.playlist().id && isPlaying() ) {
      if (currentSongIndex() === this.songIndex())
        isPlaying.set(false)
      else {
        currentSongIndex.set(this.songIndex())
        isPlaying.set(true)
      }
    } else {
      currentPlaylist.set(this.playlist())
      currentSongIndex.set(this.songIndex())
      isPlaying.set(true)
    }
  }

  handlePlay(type: 'click' | 'dblclick') { // if its mobile play on click, else on dobule click
    if (this.isMobileService.isMobile() && type === 'click') {
      this.onClickPlaySong();
    } else if (!this.isMobileService.isMobile() && type === 'dblclick') {
      this.onClickPlaySong();
    }
}
}
