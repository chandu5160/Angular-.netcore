import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { EmployeeService } from "./Services/employee.service";
import { EmployeedetailsModule } from "./employeedetails/employeedetails.module";
import { AuthguardService } from "./authguard/authguard.service";

@NgModule({
  declarations: [AppComponent, routingComponents],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    EmployeedetailsModule
  ],
  providers: [EmployeeService, AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
