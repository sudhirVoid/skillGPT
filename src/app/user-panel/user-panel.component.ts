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

  constructor(private sharedService: SharedService, private firestoreDB: FirebaseRealtimeDBService, private authService: AuthServiceService) { }
  @Output() buttonClick = new EventEmitter<void>();
  @Output() credits = new EventEmitter<number>();

  onClickLogout(): void{
    this.sharedService.logout();
    this.buttonClick.emit();
  }

  sendDataToParent() {
    this.credits.emit(this.remainingCredits);
  }

  toggleHover() {
    this.isHovered = !this.isHovered;
   
  }

  async ngOnInit() {
  this.remainingCredits = await this.firestoreDB.getCreditOfUser();
  console.log(this.remainingCredits)
  this.sendDataToParent();
}

}
