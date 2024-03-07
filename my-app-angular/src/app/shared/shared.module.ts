import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipedemoComponent } from '../pipedemo/pipedemo.component';
import { Summary } from './pipe/summary.pipe';
import { StrReverse } from './pipe/reverse.pipe';
import { ColorChanger } from './directives/colorchanger.directive';
import { TempConponentComponent } from '../temp-conponent/temp-conponent.component';
import { ConvertTemp } from './pipe/convertTemp.pipe';



@NgModule({
  declarations: [
    PipedemoComponent,
    Summary,
    StrReverse,
    ColorChanger
  ],
  exports: [
    PipedemoComponent,
    Summary,
    StrReverse,
    ColorChanger
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
