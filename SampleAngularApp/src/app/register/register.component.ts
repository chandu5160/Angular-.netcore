import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted: boolean;

  constructor(private _empService:EmployeeService) { }

  ngOnInit() {
  }
  onSubmit(){
   
    this.submitted = true;
    this._empService.reigterEmployee();
  }
  
}
