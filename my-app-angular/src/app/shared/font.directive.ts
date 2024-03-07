import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appFont]',
  standalone: true,
})
export class FontDirective {
  @Input()
  weight: string;
  constructor(private ren: Renderer2, private ef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weight']) {
      return this.ren.setStyle(
        this.ef.nativeElement,
        'font-weight',
        this.weight
      );
    }
  }

  // private defaultFont = 'normal';

  // @HostListener('mouseenter')
  // addFont() {
  //   this.defaultFont = 'bold';
  // }

  // @HostListener('mouseleave')
  // removeFont() {
  //   this.defaultFont = 'normal';
  // }

  // @HostBinding('style.fontWeight')
  // get appStyle() {
  //   return this.defaultFont;
  // }
}
