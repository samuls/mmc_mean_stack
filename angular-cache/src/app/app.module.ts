import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CacheInterceptor } from './shared/cache.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:CacheInterceptor,multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
