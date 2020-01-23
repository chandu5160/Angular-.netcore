import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../Services/employee.service";
@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  constructor(private _empService: EmployeeService) {}

  ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      this._empService.userFlag = true;
    }
  }
  logout(){
    this._empService.logout();
    this.ngOnInit();
  }
}
