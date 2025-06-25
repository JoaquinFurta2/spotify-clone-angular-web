import { Component, inject, signal } from '@angular/core';
import { PlaylistItemComponent } from "../../shared/components/playlist-item/playlist-item.component";
import { PlaylistCardComponent } from "../../shared/components/playlist-card/playlist-card.component";
import { Playlist } from '../../shared/models/data.model';
import { DataService } from '../../shared/services/data.service';
import { RouterLink, RouterLinkActive,Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { hoverColorService } from '../../shared/services/hover-color.service';



@Component({
  selector: 'app-home',
  imports: [PlaylistItemComponent, PlaylistCardComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  hService = inject(hoverColorService)
  dataService = inject(DataService)
  router = inject(Router)

  playlist$ = this.dataService.getPlaylists()

  navigate(id:string) {
    this.router.navigate(['/playlist', id])
  }

  getGreeting = signal(this.greeting())

  greeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) {
    return 'Good morning'
  } else if (hour < 18) {
    return 'Good afternoon'
  } else {
    return 'Good evening'
  }
}
}
