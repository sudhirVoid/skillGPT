import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Data, Router } from '@angular/router';
import { Database, set, ref } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { FirebaseRealtimeDBService } from '../services/firebase-realtime-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // private database: firebase.database.Database;
  responseLogin: any;
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private firestoreDB: FirebaseRealtimeDBService
  ) {
    // this.database = this.firestoreDB.getDBInstance();
  }

  signInWithGoogle() {
    this.authService.GoogleAuth().then(async (result: firebase.auth.UserCredential) => {
      const user = result.user;
      if (result.additionalUserInfo?.isNewUser && user) {
        //assign three credits now.
        console.log('New user signed in');
        await this.firestoreDB.setCreditForNewUser(user.uid,3)
      } else {
        console.log('Existing user signed in');
      }
      this.router.navigate(['/landingPage']); 
    })
    .catch((error) => {
      console.error('Error during sign-in:', error);
    });
  }

  async ngOnInit() {
    // let res = this.authService.isAuthenticated();
    // console.log("isLoggedIn : ",res);
    const result = await this.authService.isAuthenticated();
    if (result) {
      console.log(this.authService.user)
      // console.log(myDB);
      //await this.firestoreDB.setCreditForNewUser()
      
      // let database = this.database.ref();
      // console.log(database);
      this.router.navigate(['landingPage']);
      // this.loginUser.sessionTimeOut();
    }
  }
}
