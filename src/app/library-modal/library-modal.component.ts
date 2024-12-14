import { Component, Input } from '@angular/core';
import { SharedService } from '../shared.service';
import { AuthServiceService } from '../auth-service.service';
import { SyllabusService } from '../gpt-service.service';
import { DatashareService } from '../services/datashare.service';
import { Router } from '@angular/router';
@Component({
  selector: 'LibraryModal',
  templateUrl: './library-modal.component.html',
  styleUrls: ['./library-modal.component.css']
})
export class LibraryModalComponent {
  receivedCredits: number=0;
  isFlipped = false;
  flashcards:any=[];
  userId:string='';
  updatedTopics: any[]=[];
  constructor(private sharedService: SharedService,private router: Router,private authService : AuthServiceService,private syllabusService: SyllabusService,private dataShareService: DatashareService) {

  }
  @Input() topics: any=[];
  toastVisible = false;
  toastMessage:string='Complete the topic at least 80% to Unlock the Flash cards and Quizzes'

  // topics:any = [
  //   {
  //     name: 'Web design',
  //     completionPercentage: 81,
  //     flashcards: [
  //       { question: 'What does HTML stand for?', answer: 'Hypertext Markup Language' },
  //       { question: 'What is CSS used for?', answer: 'Styling web pages' }
  //     ],
  //     quizzes: 3
  //   },
  //   {
  //     name: 'Mobile Design',
  //     completionPercentage: 60,
  //     flashcards: [
  //       { question: 'What is responsive design?', answer: 'Design that adapts to different screen sizes' }
  //     ],
  //     quizzes: 2
  //   },
  //   // Add more topics with flashcards as needed
  // ];
  showToast() {
    this.toastVisible = true;
    console.log("called toaster")
    setTimeout(() => this.toastVisible = false, 7300); // 4000ms + 300ms for animation
  }

  // navigateToFlashcard(topic: any) {
  //   this.router.navigate(['/flashcard'], {
  //     state: { bookId: topic.bookId },
  //     queryParams: { bookId: topic.bookId }
  //   });
  // }
  navigateToFlashcard(topic: any) {
    // Find the flashcards for the topic's book_id
    const matchingFlashcard = this.flashcards.find((flashCard: { bookId: any; }) => flashCard.bookId === topic.book_id);
    console.log(matchingFlashcard);

    // Navigate to the flashcard route, passing flashcards and bookId through state
    this.router.navigate(['/flashcard'], {
      state: {
        bookId: topic.book_id,
        flashCards: matchingFlashcard ? matchingFlashcard.flashCards : [] // Pass the flashcards or an empty array
      },
      queryParams: { bookId: topic.book_id }
    });
  }

  navigateToQuiz(topic:any){
    console.log(topic)
    this.router.navigate(['/quiz'], { queryParams: { bookId: topic.book_id } });
  }

   async ngOnInit() {
    this.dataShareService.currentData.subscribe((message) => {
      console.log(message)
      this.topics = message;
      console.log('TOPICS')
      console.log(this.topics)
      this.topics.map((topic:any)=>{
        if(topic.percentOfBookRead>=80){
          const uid: any = localStorage.getItem('uid');

    if (uid && topic?.book_id) {
      this.syllabusService.generateFlashCards(uid, topic?.book_id).subscribe(
        (data: any[]) => {
          // const {flashCards}:any=data;
          this.flashcards.push(data);
          console.log('Flashcards:', this.flashcards);
          this.updatedTopics = this.countMatchingFlashcards(this.topics, this.flashcards);
          console.log(this.updatedTopics);
        },
        (error: any) => {
          console.error("Error fetching flashcards", error);
        }
      );
    }
        }
      });



    });
  }

  countMatchingFlashcards(topics: any[], flashCards: any[]): any[] {
    return topics.map(topic => {
      // Only modify the topic if percentOfBookRead >= 80
      if (parseFloat(topic.percentOfBookRead) >= 80) {
        const matchingFlashcard = flashCards.find(flashCard => flashCard.bookId === topic.book_id);
        const flashCardCount = matchingFlashcard ? matchingFlashcard.flashCards.length : 0;

        return {
          ...topic, // Spread the topic object
          flashCardCount // Add flashCardCount only for these topics
        };
      }
      return topic; // Return the topic unchanged if percentOfBookRead < 80
    });
  }





  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
onClickLogout(): void{
  this.sharedService.logout();
}


handleChildEvent(data: any) {
  this.receivedCredits = data.credits;
  // // console.log('Data received from child:', data);
}
}
