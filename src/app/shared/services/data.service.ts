import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist, Song } from '../models/data.model';
import { shareReplay } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'})
export class DataService {

  private playlists$!: Observable<Playlist[]>;

  constructor(private http: HttpClient) {}

  getPlaylists(): Observable<Playlist[]> {
    if (!this.playlists$) {
      this.playlists$ = this.http.get<Playlist[]>('/data/playlist.json')
        .pipe(shareReplay(1)); 
    }
    return this.playlists$;
  }

  getPlaylist(id: string): Observable<Playlist | undefined> {
    return this.http.get<Playlist[]>('/data/playlist.json')
      .pipe(map(playlists => playlists.find(p => p.id === id)));
  }

  getSong(id: string): Observable<Song> {
    return this.http.get<Song[]>('/data/songs.json')
      .pipe(shareReplay(1))
      .pipe(map(songs => songs.find(s => s.id === id)!));
  }
}
