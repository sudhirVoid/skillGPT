import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'; 
import { DataTransferService } from '../data-transfer.service';
import { AuthServiceService } from '../auth-service.service';
import * as firebase from 'firebase/compat';
import { getAuth, signOut } from "firebase/auth";
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent {
  isHovered: boolean=false;
  userImageUrl:string=''
  username:string=''

  constructor(private router: Router, private dataTransferService:DataTransferService, private authService : AuthServiceService, private sharedService: SharedService,private auth: AuthServiceService) { }
  @Output() buttonClick = new EventEmitter<void>();


  onClickLogout(): void{
    this.sharedService.logout();
    this.buttonClick.emit();
  }

   ngOnInit(){
    this.auth.getUserInfo().then((user) => {
      console.log(user.photoURL)
      if (user) {
        
        this.userImageUrl =user.photoURL;
        this.username = user.displayName;
      }
    })
  }
  toggleHover() {
    this.isHovered = !this.isHovered;
   
  }

  // logout(){

  //   const auth = getAuth();
  //   signOut(auth).then(() => {
  //     // Sign-out successful.
  //     console.log("User Logged Out");
  //     this.router.navigate(['/']);
  //   }).catch((error) => {
  //     // An error happened.
  //   });
  // }

}
