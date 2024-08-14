import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseRealtimeDBService } from '../services/firebase-realtime-db.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  razorPayKey: any;
  selectedPlan: any;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private FirebaseRealtimeDBService: FirebaseRealtimeDBService
  ) {}

  ngOnInit() {
    this.getRazorPayKey();
    this.listenSelectedProduct();
    this.getOrderId();
  }
  getRazorPayKey() {
    this.razorPayKey = this.orderService.getRazorPayKey()
  }
  getOrderId() {
    return this.route.snapshot.params['paymentOrderId'];
  }
  listenSelectedProduct() {
    this.selectedPlan = this.orderService.getSelectedProductForCheckout();
    console.log(this.selectedPlan)
  }
 


  payWithRazorpay() {
    const paymentOrderId = this.getOrderId();
    console.log(this.razorPayKey);
    const options: any = {
      key: this.razorPayKey,
      amount: this.selectedPlan?.price, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'Skill GPT Credits Shop', // company name or product name
      description: '', // product description
      // image: './../../assets/plus.png', // company logo or product image
      order_id: paymentOrderId, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#030f18',
      },
    };
    options.handler = (response: any, error: any) => {
      options.response = response;
      if (error) {
        this.router.navigateByUrl('/paymentfailed');
      } else {
        this.orderService
          .verifyPaymentSignature(response, paymentOrderId)
          .subscribe((response: any) => {
            console.log("IsPaymentVerified",response.data.isPaymentVerified);
            console.log("IsPaymentVerified data",response.data);
            const orderDetails = {
              paymentDate: (Date.now()).toString(),
              order_id: response.data.order_id,
              payment_id: response.data.payment_id,
              isPaymentVerified: response.data.isPaymentVerified,
              plan_name: this.selectedPlan.title,
              credits: this.selectedPlan.credits,
              amount: this.selectedPlan.amount
            }
            this.FirebaseRealtimeDBService.setPayDetails(orderDetails);
            if(response.data.isPaymentVerified){
              console.log("Payment Verified")
              this.router.navigateByUrl('/paymentsOrder')
            }else{
              this.router.navigateByUrl('paymentfailed');
            }
              // ? this.router.navigateByUrl('/paymentsOrder')
              // : this.router.navigateByUrl('paymentfailed');
          });
      }
      // call your backend api to verify payment signature & capture transaction
    };
    options.modal.ondismiss = () => {
      // handle the case when user closes the form while transaction is in progress
      alert('Transaction has been cancelled.');
      this.router.navigateByUrl('/paymentsOrder');
    };
    const rzp = new this.orderService.nativeWindow.Razorpay(options);
    rzp.open();
  }

}
