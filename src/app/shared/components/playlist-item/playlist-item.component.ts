import { NgOptimizedImage } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ItemCard, Playlist } from '../../models/data.model';
import { RouterLink } from '@angular/router';
import { hoverColorService } from '../../services/hover-color.service';
import { PlayButtonComponent } from "../play-button/play-button.component";

@Component({
  selector: 'app-playlist-item',
  imports: [NgOptimizedImage, PlayButtonComponent],
  templateUrl: './playlist-item.component.html',
  styleUrl: './playlist-item.component.scss'
})
export class PlaylistItemComponent {
  hService = inject(hoverColorService)
  cardData = input.required<Playlist>()

  onClick(e:MouseEvent) {
    e.stopPropagation()
  }
}
