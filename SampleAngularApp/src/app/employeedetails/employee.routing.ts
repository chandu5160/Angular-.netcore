import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddempdetailsComponent } from './addempdetails/addempdetails.component';
import { ViewempdetailsComponent } from './viewempdetails/viewempdetails.component';

const routes: Routes = [
    {path:'', component: AddempdetailsComponent},
    {path:'viewEmp', component: ViewempdetailsComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }