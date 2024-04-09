import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import firebase from 'firebase/compat';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isLoggedIn:boolean = false;
  user:any;

  constructor(private afAuth: AngularFireAuth,private router: Router) {
    afAuth.authState.subscribe(user => {
      if (user) {
        // User is logged in
        console.log('User is logged in:', user.email);
      } else {
        // User is logged out
        console.log('User is logged out');
      }
    });
   }

   async checkInitialAuthState() {
    this.user = await this.afAuth.authState.pipe(first()).toPromise();
    if (this.user) {
      console.log('User is logged in:', this.user.email);
    } else {
      console.log('User is logged out');
    }
  }

    // Sign in with Google
    GoogleAuth() {
      return this.AuthLogin(new GoogleAuthProvider());
    }

      // Auth logic to run auth providers
    AuthLogin(provider:any) {
      return this.afAuth
        .signInWithPopup(provider)
        .then((result) => {
          console.log('You have been successfully logged in!');
          this.isLoggedIn = true;
          this.router.navigate(['/landingPage']);
        })
        .catch((error) => {
          console.log(error);
          this.isLoggedIn = false;
          this.router.navigate(['/login']);
        });
    }

    async isAuthenticated(): Promise<boolean> {
      // if(this.user){
      //   console.log("Inside isAuthenticated : ",this.user);
      //   return true;
      // }else{
      //   console.log("false");
        
      //   return false;
      // }

      this.user = await this.afAuth.authState.pipe(first()).toPromise();
      if (this.user) {
        console.log('User is logged in:', this.user.email);
        console.log("user object:",this.user)
        return true;
      } else {
        console.log('User is logged out');
        return false;
      }
      
      // return this.afAuth.authState.pipe(
      //   map((user) => !!user) // Convert user to boolean (true if user exists, false if not)
      // );
    }
    async getUserInfo() {
      this.user = await this.afAuth.authState.pipe(first()).toPromise();
      if (this.user) {
        
        return this.user;
      } else {
        
        return null;
      }
    }


}
