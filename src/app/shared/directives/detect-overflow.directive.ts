import { Directive, ElementRef, Renderer2, AfterViewInit, input, inject, computed} from '@angular/core';

@Directive ({
  selector: '[appOverflowTranslate]'
})
export class OverflowTranslateDirective {

  // directive that animates the text when it overflow its containesr

  // IMPORTANT: for this directive TO WORK it needs the SCSS mixing truncate() correctly applied. 

  renderer = inject(Renderer2);
  host = inject<ElementRef<HTMLDivElement>>(ElementRef); // The element that contains the target text nodes
  triggerAni = input.required<HTMLElement>() // The element whose hover triggers the animation


  ngAfterViewInit() {
    const targets = this.host.nativeElement.querySelectorAll('h4, p, h3, h2, h1');

    this.renderer.listen(this.triggerAni(), 'mouseenter', () => {
      for (const elem of targets) {
        const scrollWidth = elem.scrollWidth;
        const clientWidth = elem.clientWidth;
    
        if (scrollWidth > clientWidth + 2) {
          const overflow = scrollWidth - clientWidth;
          const speed = 25;
          const duration = overflow / speed;
    
          this.renderer.addClass(elem, 'overflowing');
          this.renderer.setStyle(elem, '--overflow-translate', `-${overflow}px`, 2);
          this.renderer.setStyle(elem, '--overflow-duration', `${duration}s`, 2);
        }
      }
    });

    this.renderer.listen(this.triggerAni(), 'mouseleave', () => {
         for (const elem of targets) {
          this.renderer.removeClass(elem, 'overflowing');
         }
    });
  }
}