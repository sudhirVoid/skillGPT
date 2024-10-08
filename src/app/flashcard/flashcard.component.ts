import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { AuthServiceService } from '../auth-service.service';
import { SyllabusService } from '../gpt-service.service';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit {

  bookId: number = 0;
  receivedCredits: any;
  flashcards:any=[]
  currentCard:any;

  constructor(private route: ActivatedRoute,private sharedService: SharedService,private router: Router,private authService : AuthServiceService,private syllabusService: SyllabusService) { }

  ngOnInit(): void {
   
    //  const navigation = this.router.getCurrentNavigation();
    //  if (navigation && navigation.extras.state) {
    //    this.bookId = navigation.extras.state["bookId"];
    //    this.flashcards = navigation.extras.state["flashCards"];
    //    console.log(this.flashcards)
    //  }
  // Access the flashcards and bookId from navigation state
  const state = this.router.getCurrentNavigation()?.extras.state || history.state;
  
  if (state) {
    this.bookId = state.bookId;
    this.flashcards = state.flashCards || [];
    console.log('Flashcards received:', this.flashcards); // Debugging
  } else {
    console.log('No flashcards found in state.');
    
    // Optionally, handle case when no data is passed, for example load from API or localStorage
  }
   
    
    

  }

  currentIndex = 0;
  isFlipped = false;

  get currentFlashcard() {
    return this.flashcards[this.currentIndex]|| { question: '', answer: '' };
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  nextFlashcard() {
    if (this.currentIndex < this.flashcards.length - 1) {
      this.currentIndex++;
      this.isFlipped = false; // Reset flip state
    }
  }

  prevFlashcard() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.isFlipped = false; // Reset flip state
    }
  }
  onClickLogout(): void{
    this.sharedService.logout();
  }
  
  
  handleChildEvent(data: any) {
    this.receivedCredits = data.credits;
    // // console.log('Data received from child:', data);
  }

}
