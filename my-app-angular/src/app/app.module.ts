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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { Logger } from './shared/interceptor/Logger.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    Mainapp,
    FooterComponent,
    HeaderComponent,
    BindingComponent,
    RenderComponent,
    TemplateFormsComponent,
    DataDrivenFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  // Services:[UserService,ProjectService]
  providers: [UserService,ProjectService,
  {provide:HTTP_INTERCEPTORS, useClass:Logger,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
