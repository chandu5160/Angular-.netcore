import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../Services/employee.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;

  constructor(private _empService: EmployeeService) {}

  ngOnInit() {}
  onSubmit() {
    this.submitted = true;
    this._empService.loginEmployee();
  }
}
