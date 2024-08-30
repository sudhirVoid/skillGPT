import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { SharedService } from '../shared.service';

interface Plan {
  title: string;
  amount: number;
  credits: number;
}

@Component({
  selector: 'app-create-payment-order',
  templateUrl: './create-payment-order.component.html',
  styleUrls: ['./create-payment-order.component.css']
})


export class CreatePaymentOrderComponent {
  razorPayKey: any;
  plan:Plan={
    title: "",
    amount: 0,
    credits: 0,
  };
  receivedCredits: number=0;
  constructor( private route: ActivatedRoute, private router: Router, private orderService: OrderService ,private sharedService: SharedService) {}
  handleChildEvent(data: any) {
    this.receivedCredits = data;
    // console.log('Data received from child:', data);
  }
  onClickLogout(): void{
    this.sharedService.logout();
  }

  ngOnInit() {
    this.getRazorPayKey();
  }

  selectedPlan(title:string, amount:number, credits:number):void{
    // console.log(`${title} clicked`);
    this.plan['title'] = title;
    this.plan['amount'] = amount;
    this.plan['credits'] = credits;

    // Implement your checkout logic here
    console.log(this.plan)
    this.orderService.createOrder(this.plan).subscribe((response: any) => {
      if (response.status == 200) {
        const paymentOrderId = response.data.id;
        this.orderService.setSelectedPlanForCheckout(this.plan)
        this.router.navigateByUrl(`/checkout/${paymentOrderId}`);
      } else {
        alert('server side error cant process order');
      }
    });
  }
  

  ProPlanBuy(){
    // console.log("Pro Plan Clicked");
  }

  PremiumPlanBuy(){
    // console.log("Premium Plan Clicked");
  }
  
  getRazorPayKey() {
    this.razorPayKey = this.orderService.getRazorPayKey()
  }

}
