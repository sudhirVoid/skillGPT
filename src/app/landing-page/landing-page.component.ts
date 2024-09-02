import { Component } from '@angular/core';
import { SyllabusService } from '../gpt-service.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router'; 
import { DataTransferService } from '../data-transfer.service';
import { AuthServiceService } from '../auth-service.service';
import { getAuth, signOut } from "firebase/auth";
import { SharedService } from '../shared.service';
import { jsPDF } from 'jspdf';
import { FirebaseRealtimeDBService } from '../services/firebase-realtime-db.service';
import { BookConfig } from '../chapter-ui/chapter-ui.component';
import {  ViewChild, ElementRef ,HostListener, OnInit, OnDestroy } from '@angular/core';
import { PdfServiceService } from '../pdf-service.service';
import { trigger, state, style, animate, transition } from '@angular/animations';




@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [
    trigger('slideInOut', [
      state('closed', style({
        transform: 'translateX(-100%)'
      })),
      state('open', style({
        transform: 'translateX(0)'
      })),
      transition('closed <=> open', animate('0ms ease-in-out'))
    ])
  ]
})




export class LandingPageComponent {
  userId!: string;
  topic: string = '';
  results:any;
  bookChapters: any;
  isGenerating: boolean = false;
  suggestedTopics: string[] = [
    "Computer Science",
    "Data Analysis",
    "Artificial Intelligence",
    "Robotics",
    "Cybersecurity",
    "Web Development",
    "Mobile App Development",
    "Cloud Computing",
    "Data Science",
    "Machine Learning",
    "Software Engineering",
    "Game Development",
    "Virtual Reality",
    "Augmented Reality",
    "Internet of Things (IoT)",
    "Blockchain Technology",
    "Cryptocurrency",
    "Big Data Analytics",
    "Digital Marketing",
    "E-commerce",
    "User Interface (UI) Design",
    "Content Writing",
    "Copywriting",
    "Social Media Marketing",
    "Search Engine Optimization",
    "Data Visualization",
    "Network Administration",
    "Database Management",
    "System Administration",
    "DevOps Engineering"
  ];
  @ViewChild('mySidebar') sidebar!: ElementRef;
  @ViewChild('main') main!: ElementRef;
  
  userBooks: BookConfig[] = [];
  constructor(private syllabusService: SyllabusService, private router: Router, private dataTransferService:DataTransferService, private authService : AuthServiceService, private sharedService: SharedService, private firebaseDB: FirebaseRealtimeDBService, private pdfService: PdfServiceService) { }



  isModalOpen = false;
  isUpgrade=false;
  receivedCredits: number=0;


  isOpen = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }


  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  closeUpgradeModal(){
    this.isUpgrade=false;
  }
 
  handleChildEvent(data: any) {
    this.receivedCredits = data.credits;
    // console.log('Data received from child:', data);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onDocumentClick);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.sidebar &&!this.sidebar.nativeElement.contains(event.target)) {
      this.closeNav();
    }
  }
  openNav(event:Event) {
    if (this.sidebar && this.main) {
      event.stopPropagation();
      this.sidebar.nativeElement.style.width = "250px";
      this.main.nativeElement.style.marginLeft = "250px";
    }
  }

  closeNav() {
    if (this.sidebar && this.main) {
      this.sidebar.nativeElement.style.width = "0";
      this.main.nativeElement.style.marginLeft = "0";
    }
  }

  async ngOnInit() {
    this.suggestedTopics.sort( ()=>Math.random()-0.5 );
    let res = this.authService.isAuthenticated();
    // console.log("isLoggedIn : ",res);
    document.addEventListener('click', this.onDocumentClick);
    this.userId = await this.authService.getCurrentUserId();

    this.syllabusService.getUserBooks(this.userId).then(data=>{
      this.userBooks = data;
      console.log(this.userBooks)
    })
    .catch(error=>{
      // console.log(error);
      alert('Failed to Fetch Books')
    })
  }
  onClickLogout(): void{
    this.sharedService.logout();
  }

  async alreadyGeneratedBookSelection(book: BookConfig) {
    this.router.navigate(['/results', {bookId:book.book_id, isOldBook:true}]);
  }
   async postInputTopic(topic:any){
    if(await this.firebaseDB.getCreditOfUser()>0){
        this.isGenerating = true;
        this.syllabusService.generateSyllabus(topic, 'English', this.userId).subscribe(
          async response => {
            this.bookChapters = response;
            console.log('BOOK CHAPTERS: ',this.bookChapters)
            await this.firebaseDB.decreaseCredit();
              this.dataTransferService.setChaptersData(this.bookChapters);
              this.router.navigate(['/results']);        
          },
          error => {
            // Handle errors here
            console.error('Error:', error);
          }
        );
    
    }
    else{
      // alert('You exceeded 3 free credits.')
      this.openModal()
    }
    
  }
  // markBookAsCompleted(item:BookConfig, $event: MouseEvent){
  //   $event.stopPropagation();
  //   console.log($event)
  // }
  buyCredits(){
    this.isModalOpen = false;
    this.isUpgrade=true;
    console.log(this.receivedCredits)

  }

  setSuggestedTopics(event: any) {
    this.topic = event.target.innerText;
    this.postInputTopic(this.topic)
    
  }

  // downloadPdf() {
  //   this.pdfService.downloadPdf({}).subscribe(response => {
  //     const blob = new Blob([response], { type: 'application/pdf' });
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = 'filename.pdf'; // Set the filename here
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //     window.URL.revokeObjectURL(url);
  //   });
  // }
}
