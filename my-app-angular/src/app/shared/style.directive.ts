import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appStyle]',
  standalone: true,
})
export class StyleDirective {
  constructor(private ren: Renderer2, ef: ElementRef) {
    this.ren.setStyle(ef.nativeElement, 'color', 'orange');
  }

  private defaultColor = 'black';

  @HostListener('mouseenter')
  addColor() {
    this.defaultColor = 'red';
  }

  @HostListener('mouseleave')
  removeColor() {
    this.defaultColor = 'black';
  }

  @HostBinding('style.color')
  get appStyle() {
    return this.defaultColor;
  }
}
