import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, from, retry, switchMap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';
import { razorPay } from 'src/environments/environment';
import { AuthServiceService } from './auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private userIdPromise: Promise<string>;
  selectedPlanForCheckout : any;

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object,
    private authService: AuthServiceService
  ) { 
    this.userIdPromise = this.initializeUserId();
  }
  private async initializeUserId(): Promise<string> {
    try {
      return await this.authService.getCurrentUserId();
    } catch (err) {
      console.log('Cannot fetch userId:', err);
      return ''; // Return an empty string or handle the error appropriately
    }
  }
  private async generateHeader(): Promise<HttpHeaders> {
    const userId = await this.userIdPromise; // Ensure userId is resolved
    return new HttpHeaders().set('X-User-Id', userId);
  }
  createOrder(plan: any): Observable<any> {
    // Convert the Promise from generateHeader() to an Observable
    return from(this.generateHeader()).pipe(
      switchMap(headers => {
        const payload = {
          planName: plan.title,
          amount: plan.amount
        };
  
        // Return the HTTP request as an Observable with headers
        return this.httpClient.post<any>(`${environment.apiURL}api/createPaymentOrder`, {payload}, { headers });
      })
    );
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

  verifyPaymentSignature(checkoutResponse: any, original_order_id: string): Observable<any> {
    // Convert the Promise from generateHeader() to an Observable
    return from(this.generateHeader()).pipe(
      switchMap(headers => {
        const payload = {
          razorpay_signature: checkoutResponse.razorpay_signature,
          original_order_id: original_order_id,
          razorpay_payment_id: checkoutResponse.razorpay_payment_id,
        };
  
        // Return the HTTP request as an Observable with headers
        return this.httpClient.post(`${environment.apiURL}api/validatePayment`, {payload}, { headers });
      })
    );
  }

  // set payment details in db(neon)
  setPayDetailsNeon(payObj: any){
    return from(this.generateHeader()).pipe(
      switchMap(headers=>{
        return this.httpClient.post<any>(`${environment.apiURL}paymentData/setPayDetailsNeon`,{payObj},{headers})
      })
    )
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
