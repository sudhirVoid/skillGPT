import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { SyllabusService } from '../gpt-service.service';

interface QuizPaper{
  quizId: string,
  quizScore: number,
  questions: Question[]
}

interface Question {
  questionId: string;
  question: string;
  options: { text: string; is_correct: boolean;index: number }[];
  explanation: string;
  userAnswer: number;
}

@Component({
  selector: 'app-quiz-modal',
  templateUrl: './quiz-modal.component.html',
  styleUrls: ['./quiz-modal.component.css']
})
export class QuizModalComponent implements OnInit {

  bookId: number = 0;
  receivedCredits: any;
  quizForm: FormGroup = new FormGroup({});
  currentQuestionIndex = 0;
  quizPaper: QuizPaper = {quizId: "", questions: [], quizScore: 0};
  quizScore = 0;
  answers: { [key: number]: number } = {};
  isModalOpen = false;

  constructor(private activatedRoute: ActivatedRoute,private fb: FormBuilder, private sharedService: SharedService, private router: Router, private authService: AuthServiceService, private syllabusService: SyllabusService) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.bookId = params['bookId'];
      const uid = localStorage.getItem('uid') as string;
      this.initForm();
      this.preventGoingBack();
      this.syllabusService.generateQuiz(uid,this.bookId).subscribe((data: QuizPaper) => {
        console.log("QUIZ PAPER")
        console.log(data)
        this.quizPaper = data;
      })
    });
  }

  initForm() {
    const formControls: Record<string, AbstractControl> = {};
    this.quizPaper.questions.forEach((_, index) => {
      formControls[`question${index}`] = new FormControl('', Validators.required);
    });
    this.quizForm = this.fb.group(formControls);
  }

  preventGoingBack() {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, '', window.location.href);
    };
  }

  selectOption(questionIndex: number, userAnswer:number) {
    this.quizPaper.questions[questionIndex].userAnswer = userAnswer;
  }

  isAnswered(questionIndex: number): boolean {
    return this.quizPaper.questions[questionIndex].userAnswer !== -1;
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.quizPaper.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  submitQuiz() {
    console.log(this.quizPaper);
    this.quizPaper.questions.forEach((question, index) => {
      let correctOptionIndex = question.options.filter((option) => option.is_correct)[0].index;
      if(question.userAnswer === correctOptionIndex){
        this.quizPaper.quizScore = this.quizPaper.quizScore + 1;
      }
    })
    this.isModalOpen = true;
    const uid = localStorage.getItem('uid') as string;
    this.syllabusService.submitQuiz(uid,this.bookId,this.quizPaper).subscribe((data: any) => {
      console.log(data)
    })
  }

  onClickLogout(): void {
    this.sharedService.logout();
  }

  handleChildEvent(data: any) {
    this.receivedCredits = data.credits;
  }

  goToQuestion(index: number) {
    this.currentQuestionIndex = index;
  }

  closeModal(){
    this.isModalOpen = false;
    this.router.navigate(['/library']);
  }
}
