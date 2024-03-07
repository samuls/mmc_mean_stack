import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './pages/list/list.component';
import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, UserRoutingModule, HttpClientModule],
})
export class UserModule {}
