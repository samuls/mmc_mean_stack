import { Directive } from '@angular/core';
import { FontDirective } from './font.directive';
import { StyleDirective } from './style.directive';

@Directive({
  selector: '[appAppstyle]',
  hostDirectives: [
    StyleDirective,
    { directive: FontDirective, inputs: ['weight'] },
  ],
  standalone: true,
})
export class AppstyleDirective {
  constructor() {}
}
