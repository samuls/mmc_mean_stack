import { CommentRoutingModule } from './comment-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './pages/list/list.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    CommentRoutingModule,
    HttpClientModule
  ]
})
export class CommentModule { }
