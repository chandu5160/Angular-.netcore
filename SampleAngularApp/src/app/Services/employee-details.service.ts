import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { EmployeeDetails } from "../Models/employee-details.model";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
// import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: "root"
})
export class EmployeeDetailsService {
  empData: FormGroup;
  backupData;
  editflag: boolean = false;
  user = JSON.parse(sessionStorage.getItem("user"));
  readonly apiUrl = environment.apiUrl;
  userDetailsFlag: boolean = false;
  employedet: EmployeeDetails;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.resetAndIntial();
  }

  get f() {
    return this.empData.controls;
  }

  submitEmpDetail() {
    if (this.empData.invalid) {
      return;
    }
    var empDeatils = new EmployeeDetails();
    empDeatils = this.empData.value;
    empDeatils.EmpId = this.user.EmpId;

    this.http
      .post(this.apiUrl + "api/EmployeeDetails", empDeatils)
      .subscribe(data => {
        this.toastr.success(
          "Employee Details Added Successfully",
          "Employee Details"
        );
        this.userDetailsFlag = true;
        this.router.navigate(["/employeedetails/viewEmp"]);
      });
  }

  getEmployeeDetails() {
    if (this.user != null) {
      this.http
        .get<EmployeeDetails>(
          this.apiUrl + "api/EmployeeDetails/" + this.user.EmpId
        )
        .subscribe(
          data => {
            this.backupData = data;
            this.intializeData(data);
            // this.empData = this.fb.group(data);
            this.userDetailsFlag = true;
          },
          err => {}
        );
    } else {
      this.resetAndIntial();
      this.userDetailsFlag = false;
    }
  }
  edit() {
    this.editflag = true;
  }
  cancelAndResetData() {
    this.editflag = false;
    this.empData = this.fb.group(this.backupData);
  }

  update(): Observable<EmployeeDetails> {
    if (this.empData.invalid) {
      return;
    }

    var empDeatils = new EmployeeDetails();
    empDeatils = this.empData.value;
    empDeatils.EmpId = this.user.EmpId;

    this.toastr.success("Updated Successfully");

    this.http
      .put<EmployeeDetails>(
        this.apiUrl + "api/EmployeeDetails/" + this.backupData.Id,
        empDeatils
      )
      .subscribe(
        data => {
          this.backupData = data;
          this.intializeData(data);

          this.editflag = false;
        },
        err => {
          console.log(err);
        }
      );
  }

  delete() {
    if (confirm("Are You Sure Want to Delete this Record")) {
      this.toastr.warning("Deleted Successfully");
      this.http
        .delete(this.apiUrl + "api/EmployeeDetails/" + this.backupData.Id)
        .subscribe(data => {
          this.userDetailsFlag = false;

          this.router.navigate(["/employeedetails/"]);
          this.resetAndIntial();
        });
    }
  }

  intializeData(data) {
    this.empData = this.fb.group({
      DOB: [data.DOB, Validators.required],
      Address: [data.Address, Validators.required],
      City: [data.City, Validators.required],
      State: [data.State, Validators.required],
      PinCode: [
        data.PinCode,
        [Validators.required, Validators.maxLength(6), Validators.minLength(6)]
      ],
      Country: [data.Country, Validators.required]
    });
  }
  resetAndIntial() {
    this.empData = this.fb.group({
      DOB: ["", Validators.required],
      Address: ["", Validators.required],
      City: ["", Validators.required],
      State: ["", Validators.required],
      PinCode: [
        "",
        [Validators.required, Validators.maxLength(6), Validators.minLength(6)]
      ],
      Country: ["", Validators.required]
    });
  }
}
