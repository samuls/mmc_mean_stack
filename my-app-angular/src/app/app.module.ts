import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Mainapp } from './mainapp/mainapp.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UserService } from './shared/services/userdata.service';
import { ProjectService } from './shared/services/project.service';
import { BindingComponent } from './binding/binding.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RenderComponent } from './render/render.component';
import { TemplateFormsComponent } from './template-forms/template-forms.component';
import { DataDrivenFormComponent } from './data-driven-form/data-driven-form.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Logger } from './shared/interceptor/Logger.interceptor';
import { HeaderInter } from './shared/interceptor/Header.interceptor';
import { Logger2 } from './shared/interceptor/Logger2.interceptor';
import { ErrorInterc } from './shared/interceptor/ErrorInterc.interceptor';
import { CacheInterceptor } from './shared/interceptor/cache.interceptor';
import { TempConponentComponent } from './temp-conponent/temp-conponent.component';
import { ConvertTemp } from './shared/pipe/convertTemp.pipe';
import { SharedModule } from './shared/shared.module';
import { UserComponent } from './standalone/user/user.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { HostComponent } from './host/host.component';

@NgModule({
  declarations: [
    AppComponent,
    Mainapp,
    FooterComponent,
    HeaderComponent,
    BindingComponent,
    RenderComponent,
    TemplateFormsComponent,
    DataDrivenFormComponent,
    TempConponentComponent,
    ConvertTemp,
    DynamicComponent,
    HostComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    UserComponent,
  ],
  // Services:[UserService,ProjectService]
  providers: [
    UserService,
    ProjectService,
    { provide: HTTP_INTERCEPTORS, useClass: Logger, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: Logger2, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInter, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterc, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
