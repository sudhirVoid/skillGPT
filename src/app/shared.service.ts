import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 
import { DataTransferService } from './data-transfer.service';
import { AuthServiceService } from './auth-service.service';
import { getAuth, signOut } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private router: Router, private dataTransferService:DataTransferService, private authService : AuthServiceService) { }

  logout(){

    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      // // console.log("User Logged Out");
      this.router.navigate(['/']);
    }).catch((error) => {
      // An error happened.
    });
  }


}
