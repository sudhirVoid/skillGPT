import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from "@angular/router"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  responseLogin:any;
  constructor(private authService: AuthServiceService, private router: Router){}

  signInWithGoogle() {
    this.authService.GoogleAuth();
  }

  async ngOnInit(){
    // let res = this.authService.isAuthenticated();
    // console.log("isLoggedIn : ",res);
    const result = await this.authService.isAuthenticated();
    if (result) {
      console.log("isLoggedIn : ",result);
      this.router.navigate(["landingPage"]);
      // this.loginUser.sessionTimeOut();
    }
  }

}
