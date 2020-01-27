import { Component } from "@angular/core";
import { EmployeeService } from "./Services/employee.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "newapp";
  constructor(private _empService: EmployeeService) {
    _empService.serverTimeOut();
  }
}
