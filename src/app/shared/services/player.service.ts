import { computed, effect, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { Playlist, Song } from '../models/data.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DataService } from './data.service';
import { switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  isPlaying = signal(false)

  dataService = inject(DataService)

  currentPlaylist = signal<Playlist>(
    {
    "id": "1",
    "title": "Chill Vibes",
    "description": "Relax and unwind with smooth, chill tracks.",
    "image": "media/images/playlists/chill.jpg",
    "icon": "media/images/playlists/chill_ico.jpg",
    "createdBy": "Lo-Fi Station",
    "songIds": ["1","2","3","4","5","6","7","8","9","10"],
    "color": {"accent": "#da2735", "dark": "#7f1d1d"}
  }
  )
  
  getCurrentPlaylistId = computed(()=> this.currentPlaylist().id)

  getPlaylistSongsIds = computed(()=> this.currentPlaylist().songIds)
  
  getPlaylistSongsLastIndex = computed(()=> this.getPlaylistSongsIds().length - 1)

  currentSongIndex = linkedSignal(
    {
      source: this.getPlaylistSongsIds,
      computation:()=> {
        return 0
      }
    }
  )

  getCurrentSongId = computed(()=> this.getPlaylistSongsIds()[this.currentSongIndex()])
 
  readonly $currentSongData = toObservable(this.getCurrentSongId).pipe(
    switchMap(id => this.dataService.getSong(id))
  );
 
  
}
