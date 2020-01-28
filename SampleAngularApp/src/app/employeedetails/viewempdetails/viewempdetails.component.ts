import { Component, OnInit } from "@angular/core";
import { EmployeeDetailsService } from "src/app/Services/employee-details.service";

@Component({
  selector: "app-viewempdetails",
  templateUrl: "./viewempdetails.component.html",
  styleUrls: ["./viewempdetails.component.css"]
})
export class ViewempdetailsComponent implements OnInit {
  submitted = false;
  editflag: boolean = false;
  dataCopy;

  constructor(public _empDetailService: EmployeeDetailsService) {}

  ngOnInit() {
    this._empDetailService.getEmployeeDetails();
  }

  onSubmit() {
    this.submitted = true;
    this._empDetailService.submitEmpDetail();
    console.log("submitted successfully");
  }

  edit() {
    this._empDetailService.edit();
  }

  cancel() {
    
    this._empDetailService.cancelAndResetData();
  }

  update() {
    this._empDetailService.update();
  }

  delete() {
    this._empDetailService.delete();
  }
}
