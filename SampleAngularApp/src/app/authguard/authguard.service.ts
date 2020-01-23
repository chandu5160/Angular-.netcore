import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthguardService implements CanActivate {
  constructor(public router: Router) {}
  canActivate(): boolean {
    var user = JSON.parse(sessionStorage.getItem("user"));

    if (user != null) {
      return true;
    }
    else{
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
