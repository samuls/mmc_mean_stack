import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { CustomerComponent } from './userdetails/customer/customer.component';
import { EmployeeComponent } from './userdetails/employee/employee.component';
import { ProjectComponent } from './project/project.component';
import { OverseasComponent } from './project/overseas/overseas.component';
import { DomesticComponent } from './project/domestic/domestic.component';
import { RouteProtect } from './shared/routeprotect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './shared/user.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserdetailsComponent,
    PortfolioComponent,
    CustomerComponent,
    EmployeeComponent,
    ProjectComponent,
    OverseasComponent,
    DomesticComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [RouteProtect, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
