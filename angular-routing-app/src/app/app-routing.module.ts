import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'userdetails',
    component: UserdetailsComponent,
    canActivate: [RouteProtect],
    children: [
      { path: 'customer', component: CustomerComponent },
      { path: 'employee', component: EmployeeComponent },
    ],
  },
  { path: 'portfolio/:id/:action', component: PortfolioComponent },
  {
    path: 'project',
    component: ProjectComponent,
    children: [
      { path: 'overseas', component: OverseasComponent },
      { path: 'domestic', component: DomesticComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
