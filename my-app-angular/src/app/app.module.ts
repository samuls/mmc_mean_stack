import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Mainapp } from './mainapp/mainapp.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UserService } from './shared/services/userdata.service';
import { ProjectService } from './shared/services/project.service';
import { BindingComponent } from './binding/binding.component';
import { FormsModule } from '@angular/forms';
import { RenderComponent } from './render/render.component';

@NgModule({
  declarations: [
    AppComponent,
    Mainapp,
    FooterComponent,
    HeaderComponent,
    BindingComponent,
    RenderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  // Services:[UserService,ProjectService]
  providers: [UserService,ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
