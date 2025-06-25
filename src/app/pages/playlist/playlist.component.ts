import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { distinctUntilChanged, distinctUntilKeyChanged, forkJoin, switchMap, tap } from 'rxjs';
import { hoverColorService } from '../../shared/services/hover-color.service';
import { PlayButtonComponent } from "../../shared/components/play-button/play-button.component";
import { PlayerService } from '../../shared/services/player.service';
import { Playlist } from '../../shared/models/data.model';
import { FakeEqualizerComponent } from "../../shared/components/fake-equalizer/fake-equalizer.component";
import { SongTableComponent } from "../../shared/components/song-table/song-table.component";

@Component({
  selector: 'app-playlist',
  imports: [NgOptimizedImage, AsyncPipe, PlayButtonComponent, SongTableComponent],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent {
  playerService = inject(PlayerService)
  dataService = inject(DataService)
  route = inject(ActivatedRoute);
  hServcie = inject(hoverColorService)
  isPlaying = signal(false)
  isCardHover = signal(false)
  isLoading = signal(true)
  

  playlist$ = this.route.params.pipe(
 
  switchMap(p => this.dataService.getPlaylist(p['id'])),
  distinctUntilChanged(),
  )
  
  playlistSongs$ = this.playlist$.pipe(
    switchMap(playlist => {  
      return forkJoin(playlist!.songIds.map(id => this.dataService.getSong(id)))
    })
  )

  onClickPlaySong(indexOfSong:number, playlist:Playlist) {
    const currentPlaylist = this.playerService.currentPlaylist
    const isPlaying = this.playerService.isPlaying
    const currentPlaylistId = this.playerService.getCurrentPlaylistId()
    const currentSongIndex = this.playerService.currentSongIndex
    if (currentPlaylistId === playlist.id && isPlaying() ) {
      if (currentSongIndex() === indexOfSong)
        isPlaying.set(false)
      else {
        currentSongIndex.set(indexOfSong)
      }
    } else {
      currentPlaylist.set(playlist)
      currentSongIndex.set(indexOfSong)
      isPlaying.set(true)
    }
  }
}