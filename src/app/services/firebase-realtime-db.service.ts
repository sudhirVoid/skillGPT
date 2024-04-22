import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from '@angular/fire/app';
import { getDatabase, ref, child, get, update, set } from 'firebase/database';
import { AuthServiceService } from '../auth-service.service';
@Injectable({
  providedIn: 'root',
})
export class FirebaseRealtimeDBService {
  remainingCredit!: number;
  constructor(private authService: AuthServiceService) {}

  getDBInstance() {
    const myApp = initializeApp(environment.firebaseConfig);
    const myDB = getDatabase(
      myApp,
      'https://skill-gpt-ca3a9-default-rtdb.asia-southeast1.firebasedatabase.app'
    );
    return myDB;
  }
  //get credits of the current user:
  async getCreditOfUser(): Promise<number> {
    const dbRef = ref(this.getDBInstance());
    this.remainingCredit = await get(
      child(dbRef, `users/${this.authService.user.uid}/credits`)
    )
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val()['credit']);
          return snapshot.val()['credit'];
        } else {
          return 1; //incase to make user happy.
        }
      })
      .catch((error) => {
        console.error(error);
        return 1;
      });
    return this.remainingCredit;
  }

  // decrease credit in each successful book generation.
  async decreaseCredit() {
    const dbRef = ref(this.getDBInstance());
    const creditPath = `users/${this.authService.user.uid}/credits`;

    try {
      const snapshot = await get(child(dbRef, creditPath));
      let currentCredit = 1; // Default in case the data doesn't exist

      if (snapshot.exists()) {
        currentCredit = snapshot.val()['credit'];
      }

      // Decrease credit by 1
      const newCredit = currentCredit - 1;

      // Update the credit in the database
      await update(ref(this.getDBInstance(), creditPath), {
        credit: newCredit,
      });

      console.log(`Credit updated to: ${newCredit}`);
      this.remainingCredit = newCredit;
    } catch (error) {
      console.error('Error updating credit:', error);
      this.remainingCredit = 1; // TODO: make customer happy BUT we need error page here
    }
  }

  //set 3 credits for new user
  async setCreditForNewUser() {
    const dbRef = ref(this.getDBInstance());
    const creditPath = `users/${this.authService.user.uid}/credits`;

    try {
      const snapshot = await get(child(dbRef, creditPath));
      if (!snapshot.exists()) {
        set(
          ref(
            this.getDBInstance(),
            'users/' + this.authService.user.uid + '/credits'
          ),
          {
            credit: 3,
          }
        );
      }
    } catch (error) {
      console.error('Error setting default credit', error);
    }
  }
}
