import { Component,AfterViewInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute, Router,Route  } from '@angular/router';
import { FirebaseRealtimeDBService } from '../services/firebase-realtime-db.service';
import { SharedService } from '../shared.service';
import { config } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements AfterViewInit{

  razorPayKey: any='';
  selectedPlan: any={};
  receivedCredits: number=0;
  isInit:boolean=false;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private FirebaseRealtimeDBService: FirebaseRealtimeDBService,
    private sharedService: SharedService
  ) {}
  isLoading: boolean = true;


  handleChildEvent(data: any) {
    this.receivedCredits = data;
    // // console.log('Data received from child:', data);
  }
  onClickLogout(): void{
    this.sharedService.logout();
  }

  ngOnInit() {
    const routes: Route[] = this.router.config;
    console.log(routes,this.selectedPlan);
    
    
    
    

    this.getRazorPayKey();
    this.listenSelectedProduct();
    this.getOrderId();
  }
  ngAfterViewInit() {
    this.isInit=true;
    console.log('View has been initialized');
  }
  getRazorPayKey() {
    this.razorPayKey = this.orderService.getRazorPayKey()
  }
  getOrderId() {
    return this.route.snapshot.params['paymentOrderId'];
  }
  // listenSelectedProduct() {

  //   try {
  //     this.selectedPlan = this.orderService.getSelectedProductForCheckout();
    
  //   console.log(this.selectedPlan)
  //   } catch (error) {
  //     console.log(error)
      
  //   }
    
  // }

  listenSelectedProduct() {
    this.isLoading = true;
    const product = this.orderService.getSelectedProductForCheckout();
    if (product) {
      this.selectedPlan = product;
    } else {
      // Handle the case where the product is undefined (e.g., redirect, show an error)
      this.router.navigateByUrl('/landingPage');
    }
    this.isLoading = false;
  }
  
 


  payWithRazorpay() {
    const paymentOrderId = this.getOrderId();
    // // console.log(this.razorPayKey);
    const options: any = {
      key: this.razorPayKey,
      amount: this.selectedPlan?.amount+this.selectedPlan?.amount*0.02, // amount should be in paise format to display Rs 1255 without decimal point
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
      config: {
        display: {
          hide: [{method: 'paylater'}, {method: 'wallet'}]
        }
      }
    };
    options.handler = (response: any, error: any) => {
      options.response = response;
      if (error) {
        this.router.navigateByUrl('/paymentfailed');
      } else {
        this.orderService
          .verifyPaymentSignature(response, paymentOrderId)
          .subscribe((response: any) => {
            // // console.log("IsPaymentVerified",response.data.isPaymentVerified);
            // // console.log("IsPaymentVerified data",response.data);
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
              this.router.navigateByUrl('/landingPage')
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
      console.log('Transaction cancelled:',options);
      alert('Transaction has been cancelled.');
      this.router.navigateByUrl('/paymentsOrder');
    };
    const rzp = new this.orderService.nativeWindow.Razorpay(options);

    // Add a listener for page unload events to handle user navigation
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (rzp && rzp.close) {
        rzp.close(); // Close Razorpay modal if it is open
      }
      options.modal.ondismiss(); // Call the ondismiss handler
      event.preventDefault(); // Prevent the default behavior of unloading
      event.returnValue = ''; // Modern browsers require this to show a confirmation dialog
  };

   window.addEventListener('beforeunload', handleBeforeUnload);

    rzp.open();
    rzp.on('close', () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    });
  }

}
