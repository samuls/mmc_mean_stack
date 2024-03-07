import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DynamicComponent } from '../dynamic/dynamic.component';
@Component({
  selector: 'app-host',
  template: '<ng-template #dynamicComponentContainer></ng-template>',
})
export class HostComponent {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  dynamicComponentContainer: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  loadDynamicComponent(message: string) {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);
    const componentRef = componentFactory.create(
      this.dynamicComponentContainer.injector
    );
    // Set input properties of the dynamic component
    componentRef.instance.message = message;
    // Attach the dynamic component to the view
    this.dynamicComponentContainer.insert(componentRef.hostView);
  }
}
