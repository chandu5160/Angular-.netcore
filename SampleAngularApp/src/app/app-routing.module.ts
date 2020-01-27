import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { EmployeedetailsComponent } from './employeedetails/employeedetails.component';
import { AuthguardService } from './authguard/authguard.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'employeedetails',
    component: EmployeedetailsComponent,
    loadChildren: () =>
      import("./employeedetails/employeedetails.module")
        .then(data => data.EmployeedetailsModule),
        canActivate:[AuthguardService]
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, HomeComponent, RegisterComponent, NavComponent]