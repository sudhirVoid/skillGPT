import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from '@angular/fire/app';
import { getDatabase, ref, child, get, update, set } from 'firebase/database';
import { AuthServiceService } from '../auth-service.service';
import { OrderService } from '../order.service';
@Injectable({
  providedIn: 'root',
})
export class FirebaseRealtimeDBService {
  remainingCredit!: number;
  constructor(private authService: AuthServiceService, private orderService: OrderService) {}

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
          // // console.log(snapshot.val()['credit']);
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

      // // console.log(`Credit updated to: ${newCredit}`);
      this.remainingCredit = newCredit;
    } catch (error) {
      console.error('Error updating credit:', error);
      this.remainingCredit = 1; // TODO: make customer happy BUT we need error page here
    }
  }

  //set 3 credits for new user
  async setCreditForNewUser(userId:string, credit:number) {
    const dbRef = ref(this.getDBInstance());
    const creditPath = `users/${userId}/credits`;

    try {
      const snapshot = await get(child(dbRef, creditPath));
      if (!snapshot.exists()) {
        set(
          ref(
            this.getDBInstance(),
            'users/' + userId + '/credits'
          ),
          {
            credit: credit,
          }
        );
      }
    } catch (error) {
      console.error('Error setting default credit', error);
    }
  }

  //Setting payment orderId
  async setPayDetails(orderDetails:any){
    //For Both Firebase nad Neon
    const dbRef = ref(this.getDBInstance());
    const userPath = `users/${this.authService.user.uid}/payments/${orderDetails.order_id}`;
    console.log("Order Details : ", orderDetails)

    try {
      const snapshot = await get(child(dbRef, userPath));
      if (!snapshot.exists()) {
        set(
          ref(
            this.getDBInstance(),
            'users/' + this.authService.user.uid + '/payments/' + orderDetails.order_id
          ),
          {
            paymentDate: Date.now(),
            order_id: orderDetails.order_id,
            payment_id: orderDetails.payment_id,
            isPaymentVerified: orderDetails.isPaymentVerified,
            plan_name: orderDetails.plan_name,
            credits: orderDetails.credits,
            amount: orderDetails.amount
          }
        );
      }
    } catch (error) {
      console.error('Error setting default credit', error);
    }

    if(orderDetails.isPaymentVerified){
      this.appendCreditsForUser(this.authService.user.uid, orderDetails.credits)
    }

    //Setting details in Neon
    const payObj = {
      user_id: this.authService.user.uid,
      order_id: orderDetails.order_id,
      payment_id: orderDetails.payment_id,
      paymentDate: Date.now()
    }
    this.orderService.setPayDetailsNeon(payObj).subscribe((data)=>{
      // // console.log('Details saved to Neon Succesfully');
      // // console.log("Response Pay Obj :", data);
    });


  }

  //set 3 credits for new user
  async appendCreditsForUser(userId:string, credit:number) {
    const dbRef = ref(this.getDBInstance());
    const creditPath = `users/${this.authService.user.uid}/credits`;

    try {
      const snapshot = await get(child(dbRef, creditPath));
      let currentCredit = 0; // Default in case the data doesn't exist

      if (snapshot.exists()) {
        currentCredit = snapshot.val()['credit'];
      }

      // Decrease credit by 1
      const newCredit = currentCredit + credit;

      // Update the credit in the database
      await update(ref(this.getDBInstance(), creditPath), {
        credit: newCredit,
      });

      // // console.log(`Credit updated to: ${newCredit}`);
      this.remainingCredit = newCredit;
    } catch (error) {
      console.error('Error updating credit:', error);
      this.remainingCredit = 1; // TODO: make customer happy BUT we need error page here
    }
  }

}

