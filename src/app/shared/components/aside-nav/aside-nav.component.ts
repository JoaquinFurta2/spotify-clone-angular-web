import { Component, inject, input, signal } from '@angular/core';
import { DragDropModule, CdkDragMove } from '@angular/cdk/drag-drop';
import { computed } from '@angular/core';
import { AsideService } from '../../services/aside.service';
import { BreakPointService } from '../../services/breakpoint.service';


@Component({
  selector: 'app-aside-nav',
  imports: [DragDropModule],
  templateUrl: './aside-nav.component.html',
  styleUrl: './aside-nav.component.scss'
})
export class AsideNavComponent {
  asideService = inject(AsideService)
  breakpointSerivce = inject(BreakPointService)

  onRight= input.required<boolean>()
  defaultWidth = input.required<number>()
  id = input.required<string>()
  minW = input<number>()
  maxW = input<number>()
  closeW = input<number>()


  
  protected currentWidth = signal<number>(0); 
  private maxWidth =  computed(()=> this.maxW() ?? 420)
  private minWidth = computed(()=> this.minW() ?? 74)
  private closeWidth = computed(()=> this.closeW() ?? 74)

  public isOpen = signal(true)

  
  ngOnInit() {
    this.currentWidth.set(this.defaultWidth());
     this.asideService.register(this.id(), this);
  }

  public open(){
    this.isOpen.set(true)
    this.currentWidth.set(this.defaultWidth())
  }
  public close(){
    this.isOpen.set(false)
    this.currentWidth.set(this.closeWidth())
  }

  public toggle() {
    if (this.currentWidth() <= this.closeWidth()) 
      this.open()
    else 
     this.close()
  }



  protected onDragMove(e:CdkDragMove) {
    let width 
    
    if (this.onRight()) {
      width = Math.abs(e.pointerPosition.x - window.innerWidth)
    } else {
      width = e.pointerPosition.x
    }
    if (this.minWidth() <= width  && width <= this.maxWidth()) {
        if (this.breakpointSerivce.isLessThan1150px()){
            this.asideService.close('songAside')
        }
        this.isOpen.set(true)
        this.currentWidth.set(width)
    }
    if  (width < this.defaultWidth() - 100) {
         this.currentWidth.set(this.minWidth())
        if(width === this.closeWidth()) {
           this.isOpen.set(false)
        }
        
    }  
    const elem = e.source.element.nativeElement
    elem.style.transform= 'none'
  }
}
