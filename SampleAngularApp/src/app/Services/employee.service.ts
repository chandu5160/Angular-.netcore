import { Injectable } from "@angular/core";
import { Employee } from "../Models/employee.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { MustMatch } from "../Models/mustmatch.model";
import { environment } from "src/environments/environment";
import { ToastrService } from 'ngx-toastr';
import { BnNgIdleService } from "bn-ng-idle";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  readonly apiUrl = environment.apiUrl;
  formData: FormGroup;
  logindata: FormGroup;
  userFlag: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private bnIdle: BnNgIdleService,
    private toastr: ToastrService
  ) {
    this.formData = fb.group(
      {
        FirstName: ["", Validators.required],
        LastName: ["", Validators.required],
        Phone: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        Gender: ["", Validators.required],
        Email: ["", [Validators.required, Validators.email]],
        Password: ["", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/), Validators.minLength(8)]],
        ConfirmPassword: ["", Validators.required]
      },
      {
        validator: MustMatch("Password", "ConfirmPassword")
      }
    );
    this.logindata = fb.group({
      Email: ["", [Validators.required, Validators.email]],
      Password: ["", Validators.required]
    });
    this.resetForm();
  }
  get f() {
    return this.formData.controls;
  }

  get login() {
    return this.logindata.controls;
  }

  reigterEmployee() {
    console.log(this.formData.value);

    if (this.formData.invalid) {
      return;
    }
    else {
      this.http
        .post(this.apiUrl + "api/Employees", this.formData.value)
        .subscribe(data => {
          this.resetForm();
          this.toastr.success('Registered Successfully', 'Employee Register Details');
          this.router.navigate(["/login"]);
        }, err => {
          this.toastr.warning('Email/Phone number already exists', 'Registered Failed');
        });
    }
  }

  loginEmployee() {
    if (this.logindata.invalid) {
      return;
    } else {
      this.http
        .post<Employee>(
          this.apiUrl + "api/Employees/login",
          this.logindata.value
        )
        .subscribe(
          data => {
            if (data) {
              sessionStorage.setItem("user", JSON.stringify(data));
              this.userFlag = true;
              this.toastr.success('Signing in Successfully', 'Employee Login Details');
              this.router.navigate([""]);
              this.resetForm();
              this.serverTimeOut();
            }
          },
          err => {
            this.toastr.warning('Invalid Username or Password')
          }
        );
    }
  }

  logout() {
    sessionStorage.removeItem("user");
    this.userFlag = false;
    this.toastr.success('Signing out Successfully', 'Employee Logout Details');
    this.router.navigate(["/login"]);
  }

  serverTimeOut() {
    var user = JSON.parse(sessionStorage.getItem("user"));
    if (user != null) {
      this.bnIdle.startWatching(60).subscribe(res => {
        if (res) {
          this.toastr.warning('Session timed out');
          this.logout();
          this.bnIdle.stopTimer();
        }
      });
    }
  }

  resetForm() {
    this.formData.reset();
    this.logindata.reset();
  }
}
