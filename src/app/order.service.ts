import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, retry } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';
import { razorPay } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  selectedPlanForCheckout : any;

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  createOrder(plan: any): Observable<any> {
    const payload = {
      planName: plan.title,
      amount: plan.amount
    };
    return this.httpClient.post<any>(`${environment.apiURL}api/createPaymentOrder`,{payload});
  }

  getSelectedProductForCheckout() {
    return this.selectedPlanForCheckout;
  }

  setSelectedPlanForCheckout(plan: any){
    this.selectedPlanForCheckout = plan;
  }

  getRazorPayKey() {
    return razorPay.key_id;
  }

  verifyPaymentSignature(checkoutResponse: any, original_order_id: string) {
    const payload = {
      razorpay_signature: checkoutResponse.razorpay_signature,
      original_order_id: original_order_id,
      razorpay_payment_id: checkoutResponse.razorpay_payment_id,
    };

    return this.httpClient.post(`${environment.apiURL}api/validatePayment`,{payload});
  }

  // set payment details in db(neon)
  setPayDetailsNeon(payObj: any){
    return this.httpClient.post<any>(`${environment.apiURL}paymentData/setPayDetailsNeon`,{payObj})
  }

  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return _window();
    }
  }

}
function _window(): any {
  // return the global native browser window object
  return window;
}
