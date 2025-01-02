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
import { DatashareService } from '../services/datashare.service';

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
      transition('closed <=> open', animate('0ms ease-in'))
    ])
  ]
})




export class LandingPageComponent {
  userId!: string;
  topic: string = '';
  results:any;
  bookChapters: any;
  isGenerating: boolean = false;
  prompts: string[] = [
    "Share your thoughts...what’s on your mind? 🤔",
    "Type away...we’re all ears! 🎧",
    "What’s buzzing in your brain? Let us know! 🧠",
    "Got something to say? Spill the beans! 🌟",
    "Unleash your ideas here...we’re excited to read them! 📖",
    "What’s your latest thought? Type it out! 💭",
    "Let’s hear what you’re thinking...no limits! 🌈",
    "Got a question or a thought? Just type it below! 💬",
    "Your thoughts matter...share them with us! 📝",
    "Feeling inspired? Write it down here! ✨",
    "What’s on your mind? Type your thoughts here! 🗨️",
    "Let your ideas flow...we’re ready to listen! 🚀",
    "What’s the latest idea you’ve got? Share it! 🧩",
    "Your words could be magic...start typing! 🪄",
    "Feeling chatty? Let’s hear what you’ve got! 📣",
    "What’s cooking in your brain? Type it out! 🔥",
    "Got a spark of inspiration? Share it with us! 🌟",
    "What’s your latest brainstorm? We’re all ears! 👂",
    "Share your thoughts...we’re curious! 🌟",
    "Got something to share? Let’s see it! 👀"
  ];
  placeholderText: string='';
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
    "DevOps Engineering",
    "System Design",
    "Next.js"
  ];
  @ViewChild('mySidebar') sidebar!: ElementRef;
  @ViewChild('main') main!: ElementRef;

  userBooks: BookConfig[] = [];
  constructor(private syllabusService: SyllabusService, private router: Router, private dataTransferService:DataTransferService,
     private authService : AuthServiceService, private sharedService: SharedService, private firebaseDB: FirebaseRealtimeDBService,
     private pdfService: PdfServiceService,private dataShareService: DatashareService) { }

  isModalOpen = false;
  hideComponent = true;
  isUpgrade=false;
  receivedCredits: number=0;
  isTopicSelected:boolean=false;


  isOpen = false;
  menuOpen = false;
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  setRandomPlaceholder() {
    const randomIndex = Math.floor(Math.random() * this.prompts.length);
    this.placeholderText = this.prompts[randomIndex];
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
    this.setRandomPlaceholder();
    this.suggestedTopics.sort( ()=>Math.random()-0.5 );
    let res = this.authService.isAuthenticated();
    document.addEventListener('click', this.onDocumentClick);
    this.userId = await this.authService.getCurrentUserId();

    this.syllabusService.getUserBooks(this.userId).then(data=>{
      this.userBooks = data;
      this.dataShareService.updateData(this.userBooks);
    })
    .catch(error=>{
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
    if(topic.trim().length>1){

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
              console.error('Error:', error);
            }
          );
      }
      else{
        this.openModal()
      }
    }
  }


  validateInput(event: any) {
    const value = event.target.value;
    const isValid = /^(\w+(\s+)?){1,}[^A-Za-z0-9\s]*$/.test(value);
    const specialCharCount = (value.match(/[^A-Za-z0-9\s]/g) || []).length;

    // Allow up to two special characters anywhere
    if (!isValid || specialCharCount > 2) {
      // If input is invalid or has more than two special characters, remove the last character
      event.target.value = value.slice(0, -1);
      this.topic = event.target.value;
    } else {
      this.topic = value;
    }
  }

  buyCredits(){
    this.isModalOpen = false;
    this.isUpgrade=true;
    console.log(this.receivedCredits)
  }

  setSuggestedTopics(event: any) {
    this.isTopicSelected = true;
    // Trim whitespace around the text and store it
    this.topic = event.target.innerText.trim();
    this.postInputTopic(this.topic);
  }
}
