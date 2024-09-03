import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent {

  receivedCredits: number=0;
  constructor(private sharedService: SharedService, private router: Router) {}
  handleChildEvent(data: any) {
    this.receivedCredits = data;
    // // console.log('Data received from child:', data);
  }
  onClickLogout(): void{
    this.sharedService.logout();
  }
  navigateToLandingPage() {
    this.router.navigateByUrl('/landingPage', { replaceUrl: true });
  }
}
