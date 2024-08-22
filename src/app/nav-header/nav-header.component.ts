import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent {

  receivedCredits: number=0;
  constructor(private sharedService: SharedService) {}
  handleChildEvent(data: any) {
    this.receivedCredits = data;
    // console.log('Data received from child:', data);
  }
  onClickLogout(): void{
    this.sharedService.logout();
  }

}
