import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { getDatabase } from 'firebase/database';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isLoggedIn:boolean = false;
  user:any;
  private provider = new GoogleAuthProvider();

  constructor(private afAuth: AngularFireAuth,private router: Router) {
    afAuth.authState.subscribe(user => {
      if (user) {
        // User is logged in
        // // console.log('User is logged in:', user.email);
      } else {
        // User is logged out
        // // console.log('User is logged out');
      }
    });

    this.provider.setCustomParameters({
      prompt: 'select_account'
    });
   }
    async getCurrentUserId(): Promise<string> {
      return  await this.afAuth.currentUser.then(user => user ? user.uid : '');
    }


   async checkInitialAuthState() {
    this.user = await this.afAuth.authState.pipe(first()).toPromise();
    if (this.user) {
      // // console.log('User is logged in:', this.user.email);
    } else {
      // // console.log('User is logged out');
    }
  }

    // Sign in with Google
    GoogleAuth() {
      return this.afAuth.signInWithPopup(this.provider)
    }

      // Auth logic to run auth providers
    AuthLogin(provider:GoogleAuthProvider) {
      return this.afAuth
        .signInWithPopup(provider)
        .then((result) => {
          // // console.log('You have been successfully logged in!');
          this.isLoggedIn = true;
          this.router.navigate(['/landingPage']);
        })
        .catch((error) => {
          // // console.log(error);
          this.isLoggedIn = false;
          this.router.navigate(['/login']);
        });
    }

    async isAuthenticated(): Promise<boolean> {
      // if(this.user){
      //   // // console.log("Inside isAuthenticated : ",this.user);
      //   return true;
      // }else{
      //   // // console.log("false");
        
      //   return false;
      // }

      this.user = await this.afAuth.authState.pipe(first()).toPromise();
      if (this.user) {
        // // console.log('User is logged in:', this.user.email);
        return true;
      } else {
        // // console.log('User is logged out');
        return false;
      }
      
      // return this.afAuth.authState.pipe(
      //   map((user) => !!user) // Convert user to boolean (true if user exists, false if not)
      // );
    }

    // async initializeCreditForNewUser(): Promise<void> {
    //   const user = firebase.auth().currentUser;
    //   const database = getDatabase(AngularFireModule.)
    //   if (user) {
    //     await firebase.firestore().collection('users').doc(user.uid).set({
    //       credits: 3
    //     });
    //   }
    // }

}
