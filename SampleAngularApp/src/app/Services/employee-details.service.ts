import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { EmployeeDetails } from "../Models/employee-details.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EmployeeDetailsService {
  empData: FormGroup;
  backupData;
  user = JSON.parse(sessionStorage.getItem("user"));
  readonly apiUrl = environment.apiUrl;
  userDetailsFlag: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.empData = fb.group({
      DOB: ["", Validators.required],
      Address: ["", Validators.required],
      City: ["", Validators.required],
      State: ["", Validators.required],
      PinCode: ["", Validators.required],
      Country: ["", Validators.required]
    });
  }

  get f() {
    return this.empData.controls;
  }

  submitEmpDetail() {
    var empDeatils = new EmployeeDetails();
    empDeatils = this.empData.value;
    empDeatils.EmpId = this.user.EmpId;

    this.http
      .post(this.apiUrl + "api/EmployeeDetails", empDeatils)
      .subscribe(data => {
        this.userDetailsFlag = false;
      });
  }

  getEmployeeDetails() {
    if (this.user!=null) {
      this.http
        .get(this.apiUrl + "api/EmployeeDetails/" + this.user.EmpId)
        .subscribe(data => {
          this.backupData = data;
          this.empData = this.fb.group(data);
          this.userDetailsFlag = true;
        },err=>{

        });
    } else {
      this.empData.reset()
      this.userDetailsFlag = false;
    }
  }

  cancelAndResetData() {
    console.log(this.backupData);
    this.empData = this.fb.group(this.backupData);
  }

  update(): Observable<EmployeeDetails> {
    if (this.empData.invalid) {
      return;
    }

    var empDeatils = new EmployeeDetails();
    empDeatils = this.empData.value;
    empDeatils.EmpId = this.user.EmpId;

    return this.http.put<EmployeeDetails>(
      this.apiUrl + "api/EmployeeDetails/" + this.backupData.Id,
      empDeatils
    );
  }

  delete(){
   return this.http.delete(this.apiUrl+ "api/EmployeeDetails/" + this.backupData.Id)
  }
}
