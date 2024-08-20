import { Component, EventEmitter, Output } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { SharedService } from '../shared.service';
import { FirebaseRealtimeDBService } from '../services/firebase-realtime-db.service';

@Component({
  selector: 'profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent {
  constructor(private authService: AuthServiceService,private sharedService: SharedService,private firestoreDB: FirebaseRealtimeDBService) { }
  
  @Output() closeModalEvent = new EventEmitter<void>();
  remainingCredits!: number;
  closeModal() {
    this.closeModalEvent.emit();
  }


  onClickLogout(): void{
    this.sharedService.logout();
   
  }
  email:string='';
  name:string='';
  imgUrl:string='';

  getUserData(){
    return this.authService.user.multiFactor.user;
  }

 async ngOnInit() {
  console.log(this.getUserData());
  this.remainingCredits = await this.firestoreDB.getCreditOfUser();
  const {email,displayName,photoURL}= await this.getUserData();
  this.email=email;
  this.name=displayName;
  this.imgUrl=photoURL?photoURL:`https://avatar.iran.liara.run/username?username=${this.name}`;
  console.log(email);
  console.log(displayName);
  console.log(photoURL);
 }


}
