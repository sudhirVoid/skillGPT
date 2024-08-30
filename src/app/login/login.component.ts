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
  isLoading: boolean = true;
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private firestoreDB: FirebaseRealtimeDBService
  ) {
    // this.database = this.firestoreDB.getDBInstance();
  }


  private fullText1 = "Tick chapters faster,";
  private fullText2 = "learn like a master with SkillGPT!";
  displayText1 = '';
  displayText2 = '';
  private index = 0;
  private typing = true;
  private onFirstLine = true;
  private timeoutId: any;

  // Timing constants (in milliseconds)
  private readonly TYPING_SPEED = 30;  // Faster typing (was 100)
  private readonly ERASING_SPEED = 15; // Faster erasing (was 50)
  private readonly PAUSE_BEFORE_ERASE = 1000; // Shorter pause before erasing (was 2000)
  private readonly PAUSE_BEFORE_RESTART = 500; // Shorter pause before restarting (was 1000)


  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private animateText() {
    if (this.typing) {
      if (this.onFirstLine) {
        if (this.index < this.fullText1.length) {
          this.displayText1 += this.fullText1.charAt(this.index);
          this.index++;
        } else {
          this.onFirstLine = false;
          this.index = 0;
        }
      } else {
        if (this.index < this.fullText2.length) {
          this.displayText2 += this.fullText2.charAt(this.index);
          this.index++;
        } else {
          this.typing = false;
          this.timeoutId = setTimeout(() => this.animateText(), this.PAUSE_BEFORE_ERASE);
          return;
        }
      }
      this.timeoutId = setTimeout(() => this.animateText(), this.TYPING_SPEED);
    } else {
      if (this.index > 0) {
        this.displayText2 = this.fullText2.substring(0, this.index - 1);
        this.index--;
      } else if (this.displayText1.length > 0) {
        this.displayText1 = this.fullText1.substring(0, this.displayText1.length - 1);
      } else {
        this.typing = true;
        this.onFirstLine = true;
        this.timeoutId = setTimeout(() => this.animateText(), this.PAUSE_BEFORE_RESTART);
        return;
      }
      this.timeoutId = setTimeout(() => this.animateText(), this.ERASING_SPEED);
    }
  }



  signInWithGoogle() {
    
    this.authService.GoogleAuth().then(async (result: firebase.auth.UserCredential) => {
      const user = result.user;
      if (result.additionalUserInfo?.isNewUser && user) {
        //assign three credits now.
        // console.log('New user signed in');
        await this.firestoreDB.setCreditForNewUser(user.uid,3)
      } else {
        // console.log('Existing user signed in');
      }
      this.router.navigate(['/landingPage']); 
    })
    .catch((error) => {
      console.error('Error during sign-in:', error);
    });
  }

  async ngOnInit() {
    this.animateText();
    // let res = this.authService.isAuthenticated();
    // // console.log("isLoggedIn : ",res);
    this.authService.isAuthenticated().then(result =>{
      if(result){
        this.router.navigate(['landingPage']);
      }
      this.isLoading = false;
    })
    const result = await this.authService.isAuthenticated();
    if (result) {
      
      console.log('res:',result);
      console.log(this.authService.user)
      // // console.log(myDB);
      //await this.firestoreDB.setCreditForNewUser()
      
      // let database = this.database.ref();
      // // console.log(database);
      
      // this.loginUser.sessionTimeOut();
    }
    
  }
}
