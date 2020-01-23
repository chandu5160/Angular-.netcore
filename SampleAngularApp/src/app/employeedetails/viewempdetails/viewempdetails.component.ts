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

  constructor(private _empDetailService: EmployeeDetailsService) {}

  ngOnInit() {
    this._empDetailService.getEmployeeDetails();
  }

  onSubmit() {
    this.submitted = true;
    this._empDetailService.submitEmpDetail();
    console.log("submitted successfully");
  }

  edit() {
    this.editflag = true;
  }

  cancel() {
    this.editflag = false;
    this._empDetailService.cancelAndResetData();
  }

  update() {
    this._empDetailService.update().subscribe(
      data => {
        this.editflag = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  delete() {
    this._empDetailService.delete();
  }
}
