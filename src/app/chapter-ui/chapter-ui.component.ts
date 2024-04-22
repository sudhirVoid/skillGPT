import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SyllabusService } from '../gpt-service.service';
import { ActivatedRoute } from '@angular/router';
import { DataTransferService } from '../data-transfer.service';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { SharedService } from '../shared.service';

interface BookConfig {
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

  //we have whole conversation of a chapter between user and gpt here.
  chapterConversation: {
    gpt: SafeHtml;
    user?: string;
  }[] = [];

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
    // this.activeItem = subject;
    // console.log("active item: ",this.activeItem)

    this.breadcrumbs.push(subject.title);
    this.isCurrentSubject = true;
    this.currentSubject = subject.title;
    // this.selectedSubject = subject;
    // this.filteredChapters = this.chapters.filter(chapter => chapter.subject === subject)
    // .map(chapter => chapter.chapter);
  }
  addNewTopic(): void {
    this.isChapterMode = !this.isChapterMode;
    this.isCurrentSubject = !this.isCurrentSubject;
    this.breadcrumbs = [];
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
    private sharedService: SharedService
  ) {}

  async ngOnInit(): Promise<void> {
    let firstChapter: ChapterConfig;
    let bookName = '';

    let res = this.authService.isAuthenticated();
    console.log('isLoggedIn : ', res);
    // Retrieve the data using the service
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
        this.booksArray.push(chapters.topicData);
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
