import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeedetailsComponent } from './employeedetails.component';
import { SidewrapperComponent } from './sidewrapper/sidewrapper.component';
import { AddempdetailsComponent } from './addempdetails/addempdetails.component';
import { ViewempdetailsComponent } from './viewempdetails/viewempdetails.component';
import { EmployeeRoutingModule } from './employee.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EmployeedetailsComponent, SidewrapperComponent, AddempdetailsComponent, ViewempdetailsComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployeedetailsModule { }
