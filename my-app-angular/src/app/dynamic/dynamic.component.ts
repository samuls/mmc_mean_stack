import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic',
  template: '<p>{{ message }}</p>',
})
export class DynamicComponent {
  @Input() message: string;
}
