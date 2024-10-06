import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
@Component({
  selector: 'LibraryModal',
  templateUrl: './library-modal.component.html',
  styleUrls: ['./library-modal.component.css']
})
export class LibraryModalComponent {
  receivedCredits: number=0;
  constructor(private sharedService: SharedService) {
    
  }
onClickLogout(): void{
  this.sharedService.logout();
}


handleChildEvent(data: any) {
  this.receivedCredits = data.credits;
  // // console.log('Data received from child:', data);
}
}
