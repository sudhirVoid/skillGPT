import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { SharedService } from '../shared.service';
import { FirebaseRealtimeDBService } from '../services/firebase-realtime-db.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent{
  isHovered: boolean=false;
  remainingCredits!: number;
  imgUrl:string='';
  isModalOpen = false;
  constructor(private sharedService: SharedService, private firestoreDB: FirebaseRealtimeDBService, private authService: AuthServiceService) { }
  @Output() buttonClick = new EventEmitter<void>();
  @Output() credits = new EventEmitter<any>();

  onClickLogout(): void{
    this.sharedService.logout();
    this.buttonClick.emit();
  }
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }

  sendDataToParent(name:string,photoURL:string) {
    const data={name,photoURL,credits:this.remainingCredits};
    this.credits.emit(data);
  }

  toggleHover() {
    this.isHovered = !this.isHovered;
   
  }

  getUserData(){
    return this.authService.user.multiFactor.user;
  }

  async ngOnInit() {
  this.remainingCredits = await this.firestoreDB.getCreditOfUser();
  console.log(this.remainingCredits)
  console.log("user data:",this.getUserData());
  const {displayName,photoURL}=await this.getUserData();
  console.log("name on this page:",displayName);
  this.imgUrl=photoURL?photoURL:`https://avatar.iran.liara.run/username?username=${displayName}`
  this.sendDataToParent(displayName,photoURL);
}

}
