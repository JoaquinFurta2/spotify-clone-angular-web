import { AsyncPipe, DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, effect, ElementRef, inject, Input, signal } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import { viewChild } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { single, take, Unsubscribable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AsideService } from '../../services/aside.service';
import { BreakPointService } from '../../services/breakpoint.service';


@Component({
  selector: 'app-player',
  imports: [NgOptimizedImage, MatSliderModule, AsyncPipe, FormsModule, DatePipe],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
   playerService = inject(PlayerService)
   asideService = inject(AsideService)
   breakpointService = inject(BreakPointService)

   liked = signal(false)
   audio = viewChild<ElementRef<HTMLAudioElement>>('audio')
   unsubscribe:Unsubscribable | null = null 
   songDuration = signal(0)

   isLoading = signal(true)
   songCurrentTime = signal(0)
   volumen= signal(100) 
   rotateIcon = signal(false)

  
   constructor() {   
       
    effect(() => {  
      const audioElem = this.audio()?.nativeElement;
      if (!audioElem) 
        return
      
      if (this.playerService.isPlaying()) {
        audioElem.play()
      } else {
        audioElem.pause()
      }
    });
    effect(() => {  
      const audioElem = this.audio()?.nativeElement;
      if (!audioElem) 
        return
      
      if (this.playerService.currentPlaylist()) {
        audioElem.currentTime = 0
      }
      if (this.playerService.currentSongIndex()) {
        audioElem.currentTime = 0

      }
    });
   }
    
  toggleLiked(e:MouseEvent) {
      e.stopPropagation()
    this.liked.update((prev)=> !prev)
  } 

  togglePlay(e:MouseEvent) {
    e.stopPropagation()
    this.playerService.isPlaying.update((prev)=> !prev )

  }

  nextSong() { 
    const audioElem = this.audio()?.nativeElement
    if (!audioElem)
      return
    
    this.playerService.currentSongIndex.update(val => {
      if (val + 1 > this.playerService.getPlaylistSongsLastIndex()) {
        return val
        } else {
        this.isLoading.set(true)
        return val + 1;
        }
    }
      
    )
  }
  
  prevSong() {    
    const audioElem = this.audio()?.nativeElement
    if (!audioElem)
      return
    if(audioElem.currentTime > 4) {
      audioElem.currentTime = 0
    } else {
      
      this.playerService.currentSongIndex.update(val => {
        if (val - 1 > 0) {
            this.isLoading.set(true)
            return val - 1;
        } else {
            return 0;
        }
      })
    }    
  }

  load() { // Wait unitl song is loaded then paly it
    this.audio()!.nativeElement.pause()
    if(this.playerService.isPlaying()) {
       this.playerService.$currentSongData
       .pipe(take(1))
       .subscribe(()=> {
          this.audio()!.nativeElement.play()
      })
    } 
  }
  

  onMetadataLoaded() { // get song duration
      const audioElem = this.audio()?.nativeElement;
       if (!audioElem) 
       return 
      this.songDuration.set(audioElem.duration)
   }


  updateValue() {
   
    const audioElem = this.audio()?.nativeElement;
    if (!audioElem) 
        return 
    this.songCurrentTime.set(audioElem.currentTime)
  
  }
   updateSlider(n:number) {
    const audioElem = this.audio()?.nativeElement;
    if (!audioElem) 
        return 
    audioElem.currentTime = n
  }





  togglePlayer = signal(false)
  toggleVolume = signal(true)

  toggleVolumeHandler(){
    const audioElem = this.audio()?.nativeElement;
    if (!audioElem) 
        return 
    this.toggleVolume.update((prev) => !prev)
    
    if(audioElem.muted) {
      audioElem.muted = false
      this.volumen.set( Math.sqrt(audioElem.volume) * 100 ) 
      
    } else {
      this.volumen.set(0)
      audioElem.muted = true
    }
    
  }


updateVolumen(newVol:number){
  const audioElem = this.audio()?.nativeElement;
  if (!audioElem) 
      return

  if(audioElem.muted) {
    this.toggleVolume.set(true)
    audioElem.muted = false
  }
  if(newVol === 0) {
     this.toggleVolumeHandler()
     return
  }

  this.volumen.set(newVol)
  audioElem.volume =( newVol / 100) ** 2
 
}

handleSongDetailsButton() {
  if(this.breakpointService.isLessThan1150px()) {
     this.asideService.close('libAside')   
  }
  this.asideService.toggle('songAside')
 
}




}

