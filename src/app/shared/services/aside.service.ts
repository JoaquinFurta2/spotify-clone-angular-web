import { computed, Injectable } from '@angular/core';
import { AsideNavComponent } from '../components/aside-nav/aside-nav.component';

@Injectable({
  providedIn: 'root'
})

export class AsideService {
  private asides = new Map<string, AsideNavComponent>();

  register(id: string, aside: AsideNavComponent) {
    this.asides.set(id, aside);
  }

  isRegistered(id: string): boolean {
    return this.asides.has(id);
  }

  open(id: string) {
    this.asides.get(id)?.open();
  }

  close(id: string) {
    this.asides.get(id)?.close();
  }

  toggle(id: string) {
    this.asides.get(id)?.toggle();
  }

  isOpen(id:string) {
    const asideElement =this.asides.get(id)
    if(asideElement) {
      return asideElement.isOpen()
    } else {
      return false
    }
  }
}
