import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { EmployeeDetailsService } from "src/app/Services/employee-details.service";

@Component({
  selector: "app-addempdetails",
  templateUrl: "./addempdetails.component.html",
  styleUrls: ["./addempdetails.component.css"]
})
export class AddempdetailsComponent implements OnInit {
  submitted = false;

  constructor(private _empDetailService: EmployeeDetailsService) {}

  ngOnInit() {
   this._empDetailService.getEmployeeDetails();

  }

  onSubmit() {
    this.submitted = true;
    this._empDetailService.submitEmpDetail();
    console.log("submitted successfully");
  }
}
