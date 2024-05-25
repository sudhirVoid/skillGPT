import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SyllabusService } from '../gpt-service.service';
import { ActivatedRoute } from '@angular/router';
import { DataTransferService } from '../data-transfer.service';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { SharedService } from '../shared.service';

export  interface BookConfig {
  book_id: string;
  title: string;
}
export interface ChapterConfig {
  chapterid: number;
  chaptertitle: string;
}
@Component({
  selector: 'app-chapter-ui',
  templateUrl: './chapter-ui.component.html',
  styleUrls: ['./chapter-ui.component.css'],
})
export class ChapterUiComponent {
  @ViewChild('htmlContent') htmlContent!: ElementRef<HTMLDivElement>;

  textToType: string = 'Hello, I am ChatGPT!';
  typedText: string = '';
  safeHtml: SafeHtml = '';
  breadcrumbs: string[] = [];
  isChapterMode: boolean = false;
  booksArray: BookConfig[] = [];
  chapters: { subject: string; chapter: string }[] = [];
  selectedSubject: string = '';
  filteredChapters: string[] = [];
  currentSubject: string = '';
  isCurrentSubject: boolean = false;
  currentSubjects: string[] = [];
  activeItem!: string;
  userId!: string;
  //we have whole conversation of a chapter between user and gpt here.
  chapterConversation: {
    gpt: SafeHtml;
    user?: string;
  }[] = [];
  isOldBook: boolean = false;
  bookId!: number;

  copyCode() {
    const codeElement = this.htmlContent?.nativeElement.querySelector('code');
    if (codeElement) {
      const codeText = codeElement.textContent!;
      navigator.clipboard
        .writeText(codeText)
        .then(() => {
          alert('Code copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy code: ', err);
        });
    } else {
      console.error('Code element not found.');
    }
  }

  isActiveItem(item: ChapterConfig): boolean {
    return this.activeItem === item.chaptertitle;
  }

  selectBook(subject: BookConfig): void {
    let firstChapter: ChapterConfig;
    let bookName = '';
    // this.activeItem = subject;
    // console.log("active item: ",this.activeItem)

    this.breadcrumbs.push(subject.title);
    this.isCurrentSubject = true;
    this.currentSubject = subject.title;
    // this.selectedSubject = subject;
    // this.filteredChapters = this.chapters.filter(chapter => chapter.subject === subject)
    // .map(chapter => chapter.chapter);
    //TODO: populate book chapters here: this.bookChapters // check in db if not generate it

    try {
      this.dataTransferService.getChaptersData().subscribe((chapters) => {
        this.bookChapters = chapters.chaptersData;
        /*
        structure of each chapter.
          {
              "chapterid": 46,
              "chaptertitle": "Introduction to Astronomy"
          }
        */
        firstChapter = chapters.chaptersData[0];
        bookName = chapters.topic;
        this.activeItem = this.bookChapters[0].chaptertitle;
        this.currentSubject = chapters['topicData']['title'];
        
        console.log('Received chapters:', chapters);
        // this.isActiveItem(firstChapter);
        this.isActiveItem(firstChapter);
        this.breadcrumbs.push(this.currentSubject);
        this.breadcrumbs.push(this.bookChapters[0].chaptertitle);

        this.isCurrentSubject = true;
      });
    } catch (error) {
      console.log('no Topic present');
      this.router.navigate(['landingPage']);
    }
  }
  async addNewTopic() {

    this.isChapterMode = !this.isChapterMode;
    this.isCurrentSubject = !this.isCurrentSubject;
    this.breadcrumbs = [];
    
    //get all the books of the user here. BookConfig Interface.




    
  }

  redirectTo(route: string): void {
    this.router.navigate([route]);
  }

  selectChapter(chapter: ChapterConfig): void {
    this.safeHtml = '';
    console.log(chapter);
    this.activeItem = chapter.chaptertitle;
    console.log('active item: ', this.activeItem);
    // this.isActiveItem(chapter);

    if (!this.breadcrumbs.includes(chapter.chaptertitle)) {
      // If the chapter doesn't exist, pop the last chapter (if exists) and push the new chapter
      if (this.breadcrumbs.length >= 2) {
        this.breadcrumbs.pop();
      }
      this.breadcrumbs.push(chapter.chaptertitle);
    }
    //check if content is already present or not
    if (localStorage.getItem(`${chapter.chapterid}`)) {
      let chapterData = JSON.parse(
        localStorage.getItem(`${chapter.chapterid}`)!
      );
      this.chapterConversation = [];
      console.log('IN LOCAL STORAGE: ', chapterData);
      chapterData.map((singleChat: { gpt: any; user?: string }) => {
        return this.chapterConversation.push({
          gpt: this.renderingHtmlRes(
            singleChat?.gpt.changingThisBreaksApplicationSecurity
          ),
          user: singleChat?.user ?? '',
        });
      });

      //this.renderingHtmlRes(chapterData[0].gpt.changingThisBreaksApplicationSecurity)
    } else {
      this.chapterConversation = [];
      this.syllabusService
        .getChapterContents(this.selectedSubject, chapter, 'English')
        .subscribe((response) => {
          // Handle the response from the API here
          response.msg[0].content_text.map(
            (singleChat: { gpt: string; user?: string }) => {
              return this.chapterConversation.push({
                gpt: this.renderingHtmlRes(singleChat?.gpt),
                user: singleChat?.user ?? '',
              });
            }
          );
          localStorage.setItem(
            `${chapter.chapterid}`,
            JSON.stringify(this.chapterConversation)
          );
          console.log(response);
          // this.safeHtml = response.msg;
          //this.renderingHtmlRes(response.msg[0].content_text)
        });
    }
  }

  bookChapters: ChapterConfig[] = [];
  constructor(
    private syllabusService: SyllabusService,
    private route: ActivatedRoute,
    private dataTransferService: DataTransferService,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private router: Router,
    private authService: AuthServiceService,
    private sharedService: SharedService,
  ) {}

  async ngOnInit(): Promise<void> {
    let firstChapter: ChapterConfig;
    let bookName = '';
    this.isCurrentSubject = true;

    let res = this.authService.isAuthenticated();
    this.userId = await this.authService.getCurrentUserId();

    // {bookId:book.book_id, isOldBook:true} if user is trying to access the old books;

      this.isOldBook = this.route.snapshot.paramMap.get('isOldBook') === 'true'; // Convert string to boolean
      console.log(this.isOldBook)
      this.bookId = parseInt(this.route.snapshot.paramMap.get('bookId') || '0');

    //this.isOldBook =  this.route.snapshot.paramMap.get('isOldBook') === 'true';
    if(!this.isOldBook){
      
    try {
      this.dataTransferService.getChaptersData().subscribe((chapters) => {
        this.bookChapters = chapters.chaptersData;
        /*
        structure of each chapter.
          {
              "chapterid": 46,
              "chaptertitle": "Introduction to Astronomy"
          }
        */
        firstChapter = chapters.chaptersData[0];
        bookName = chapters.topic;
        this.activeItem = this.bookChapters[0].chaptertitle;
        this.currentSubject = chapters['topicData']['title'];
        
        console.log('Received chapters:', chapters);
        // this.isActiveItem(firstChapter);
        this.isActiveItem(firstChapter);
        this.breadcrumbs.push(this.currentSubject);
        this.breadcrumbs.push(this.bookChapters[0].chaptertitle);

        
      });
    } catch (error) {
      console.log('no Topic present');
      this.router.navigate(['landingPage']);
    }
    try {
      this.syllabusService
        .getChapterContents(bookName, this.bookChapters[0], 'English')
        .subscribe((response) => {
          // Handle the response from the API here
          console.log(response);

          response.msg[0].content_text.map(
            (singleChat: { gpt: string; user?: string }) => {
              return this.chapterConversation.push({
                gpt: this.renderingHtmlRes(singleChat?.gpt),
                user: singleChat?.user ?? '',
              });
            }
          );
          localStorage.setItem(
            `${firstChapter.chapterid}`,
            JSON.stringify(this.chapterConversation)
          );

          console.log('AT FIRST CHAPTER DATA : ', this.chapterConversation);

          // this.safeHtml = response.msg;
          // this.renderingHtmlRes(response.msg)
        });
    } catch (error) {
      this.router.navigate(['landingPage']);
    }
    }else{
      // handle old book with database fetching.
      let allBookData = await this.fetchOldBookData(this.bookId,this.userId);
      this.bookChapters = allBookData.chaptersData;
      firstChapter = allBookData.chaptersData[0];
      bookName = allBookData.topicData.title;
      this.activeItem = this.bookChapters[0].chaptertitle;
      this.currentSubject = allBookData['topicData']['title'];
      
      console.log('Received ALL BOOK DATA :', allBookData);
      // this.isActiveItem(firstChapter);
      this.isActiveItem(firstChapter);
      this.breadcrumbs.push(this.currentSubject);
      this.breadcrumbs.push(this.bookChapters[0].chaptertitle);


      //##NEXT SECTION

      //need to click onece and content is getting visible. this is a bug.
      this.chapterConversation = await JSON.parse(localStorage.getItem(`${firstChapter.chapterid}`)!);
    }
  
    // Retrieve the data using the service
    

    if(this.userId != null){
      this.booksArray = await this.syllabusService.getUserBooks(this.userId)
    }
    console.log('MYBOOKS:', this.booksArray)
  }

  async fetchOldBookData(bookId: number, userId: string){
    let wholeBookData = await this.syllabusService.getOldBookData(bookId, userId);
    let userData = wholeBookData.userData;
    const topicData = {
      book_id: userData[0].bookid,
      title: userData[0].booktitle,
      user_id: userData[0].userid
  };
  const chaptersData = userData.map((data: any) => ({
    chapterid: data.chapterid,
    chaptertitle: data.chaptertitle
  }));

  return {topicData, chaptersData, userData}

  }
  renderingHtmlRes(htmlRes: string) {
    this.safeHtml = '';
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(htmlRes);
    console.log(this.safeHtml);
    return this.safeHtml;
  }

  onClickLogout(): void {
    this.sharedService.logout();
  }

  

}
