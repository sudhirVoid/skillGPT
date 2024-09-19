import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Renderer2 , AfterViewChecked, HostListener } from '@angular/core';
import { SyllabusService } from '../gpt-service.service';
import { ActivatedRoute } from '@angular/router';
import { DataTransferService } from '../data-transfer.service';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { SharedService } from '../shared.service';
import { PdfServiceService } from '../pdf-service.service';
export  interface BookConfig {
  book_id: string;
  title: string;
  percentOfBookRead?:number
}
export interface ChapterConfig {
  chapterid: number;
  chaptertitle: string;
  isChapterCompleted?:boolean
}
@Component({
  selector: 'app-chapter-ui',
  templateUrl: './chapter-ui.component.html',
  styleUrls: ['./chapter-ui.component.css'],
})
export class ChapterUiComponent implements AfterViewInit {
  @ViewChild('htmlContent') htmlContent!: ElementRef<HTMLDivElement>;
  @ViewChild('scrollMe')
  private myScrollContainer!: ElementRef;
  scrolledToBottom = false;
  activeChapterId!: number;
  imageUrl:string='';
  isDownloading: boolean = false;
  inputEvent: MouseEvent | undefined;
  isUserInput:boolean=false;
  typingPlaceHolder:string=`AI is generating....`;
  toastVisible = false;
  toastMessage = 'Download started...';

  showToast() {
    this.toastVisible = true;
    setTimeout(() => this.toastVisible = false, 4300); // 4000ms + 300ms for animation
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    // Check if click was outside sidebar and toggle button
    if (this.isNavOpen && this.eRef.nativeElement.contains(targetElement)) {
      console.log("clicked")
      this.isNavOpen = false;
    }
  }


  scrollToBottom(): void {
    try {
      /**Add the condition**/
      if (!this.scrolledToBottom) {
        this.myScrollContainer.nativeElement.scrollTop =
          this.myScrollContainer.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }

  /**Add the method**/
  onScroll() {
    this.scrolledToBottom = true;
  }


  ngAfterViewInit() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('h-screen')?.parentElement;

    menuToggle?.addEventListener('click', () => {
      sidebar?.classList.toggle('hidden');
    });
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
    this.addCopyButtons();
    // this.scrolledToBottom = false;
  }
  isNavOpen = false;
  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  

  receivedCredits: number=0;

  // Method to handle the event and receive data from the child
  handleChildEvent(data: any) {
    this.receivedCredits = data.credits;
    this.imageUrl=data.photoURL;
    // // console.log('Data received from child:', data);
  }

  isSidebarVisible = false;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

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
    user?: SafeHtml;
  }[] = [];
  isOldBook: boolean = false;
  bookId!: number;
  userQuery: string = '';
  isChapterLoading:boolean=false;




  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  // copyCode() {
  //   const codeElement = this.htmlContent?.nativeElement.querySelector('code');
  //   if (codeElement) {
  //     const codeText = codeElement.textContent!;
  //     navigator.clipboard
  //       .writeText(codeText)
  //       .then(() => {
  //         alert('Code copied to clipboard!');
  //       })
  //       .catch((err) => {
  //         console.error('Failed to copy code: ', err);
  //       });
  //   } else {
  //     console.error('Code element not found.');
  //   }
  // }

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
        
        // // console.log('Received chapters:', chapters);
        // this.isActiveItem(firstChapter);
        this.isActiveItem(firstChapter);
        this.breadcrumbs.push(this.currentSubject);
        this.breadcrumbs.push(this.bookChapters[0].chaptertitle);

        this.isCurrentSubject = true;
      });
    } catch (error) {
      // // console.log('no Topic present');
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
    this.isChapterLoading=true;
    // // console.log("ischapterLoading:",this.isChapterLoading);
    this.activeChapterId = chapter.chapterid
    this.safeHtml = '';
    // // console.log(chapter);
    this.activeItem = chapter.chaptertitle;
    // // console.log('active item: ', this.activeItem);
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
      // // console.log('IN LOCAL STORAGE: ', chapterData);
      chapterData.map((singleChat: { gpt: any; user?: any }) => {
        const userText = singleChat?.user?.changingThisBreaksApplicationSecurity ?? '';
        return this.chapterConversation.push({
          gpt: this.renderingHtmlRes(
            singleChat?.gpt.changingThisBreaksApplicationSecurity
          ),
          user: userText !== '' ? this.renderingHtmlRes(userText) : '',
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
          // // console.log(response);
          // this.safeHtml = response.msg;
          //this.renderingHtmlRes(response.msg[0].content_text)
        });
    }
    if(this.safeHtml){
      // // console.log("ischapterLoadingdfd:",this.isChapterLoading);
      this.isChapterLoading=false;
      // // console.log("ischapterLoadingdfd:",this.isChapterLoading);
    }
  }

  bookChapters: ChapterConfig[] = [];
  constructor(
    private eRef: ElementRef,
    private syllabusService: SyllabusService,
    private route: ActivatedRoute,
    private dataTransferService: DataTransferService,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private router: Router,
    private authService: AuthServiceService,
    private sharedService: SharedService,
    private pdfService: PdfServiceService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

// copy code
// addCopyButtons() {
//   const codeBlocks = this.el.nativeElement.querySelectorAll('pre');

//   codeBlocks.forEach((codeBlock: HTMLElement, index: number) => {
//     // Add a unique class to each code block
//     const uniqueClass = `code-block-${index}`;
//     this.renderer.addClass(codeBlock, uniqueClass);

//     const existingButton = codeBlock.querySelector('.copy-button');
//     if (!existingButton) {
//       const button = this.renderer.createElement('button');
//       const text = this.renderer.createText('Copy');
//       this.renderer.appendChild(button, text);
//       this.renderer.addClass(button, 'copy-button');

//       // Attach the click event to the specific code block's button
//       this.renderer.listen(button, 'click', () => {
//         this.copyCode(uniqueClass);
//       });

//       this.renderer.appendChild(codeBlock, button);
//     }
//   });
// }
addCopyButtons() {
  const codeBlocks = this.el.nativeElement.querySelectorAll('pre');

  codeBlocks.forEach((codeBlock: HTMLElement, index: number) => {
    const uniqueClass = `code-block-${index}`;
    this.renderer.addClass(codeBlock, uniqueClass);
    this.renderer.setStyle(codeBlock, 'color', '#31fffe');

    const existingButton = codeBlock.querySelector('.copy-button');
    if (!existingButton) {
      const button = this.renderer.createElement('button');
      const text = this.renderer.createText('Copy');
      this.renderer.appendChild(button, text);
      this.renderer.addClass(button, 'copy-button');

      // Attach the click event to the specific code block's button
      this.renderer.listen(button, 'click', () => {
        this.copyCode(button);
      });

      this.renderer.appendChild(codeBlock, button);
    }
  });
}


// copyCode(uniqueClass: string) {
//   const codeElement = this.el.nativeElement.querySelector(`.${uniqueClass} code`);

//   if (codeElement) {
//     const codeToCopy = codeElement.innerText;

//     navigator.clipboard.writeText(codeToCopy).then(() => {
//       // alert('Code copied to clipboard!');
    

//     }).catch(err => {
//       console.error('Failed to copy: ', err);
//     });
//   }
// }
copyCode(button: HTMLElement) {
  const codeElement = button.parentElement?.querySelector('code');
  const codeToCopy = codeElement?.innerText;

  if (codeToCopy) {
    navigator.clipboard.writeText(codeToCopy).then(() => {
      const originalText = button.innerText;
      button.innerText = 'Copied';
      button.style.background='#b8d5b8';
      button.style.color='#023302';
      button.style.fontWeight='bold';

      // Change the text back to "Copy Code" after 3 seconds
      setTimeout(() => {
        button.innerText = originalText;
        
      }, 300);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }
}


// 

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
       this.bookId = chapters.topicData.book_id
        firstChapter = chapters.chaptersData[0];
        bookName = chapters.topic;
        this.activeItem = this.bookChapters[0].chaptertitle;
        this.activeChapterId = this.bookChapters[0].chapterid
        this.currentSubject = chapters['topicData']['title'];
        
        // // console.log('Received chapters:', chapters);
        // this.isActiveItem(firstChapter);
        this.isActiveItem(firstChapter);
        this.breadcrumbs.push(this.currentSubject);
        this.breadcrumbs.push(this.bookChapters[0].chaptertitle);

        
      });
    } catch (error) {
      // // console.log('no Topic present');
      this.router.navigate(['landingPage']);
    }
    try {
      this.syllabusService
        .getChapterContents(bookName, this.bookChapters[0], 'English')
        .subscribe((response) => {
          // Handle the response from the API here
          // // console.log(response);

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
        });
    } catch (error) {
      this.router.navigate(['landingPage']);
    }
    }else{
      // handle old book with database fetching.
      let allBookData = await this.fetchOldBookData(this.bookId,this.userId);
      this.bookChapters = allBookData.chaptersData;
      this.bookChapters.sort((a, b) => a.chapterid - b.chapterid);
      firstChapter = allBookData.chaptersData[0];
      bookName = allBookData.topicData.title;
      this.activeItem = this.bookChapters[0].chaptertitle;
      this.currentSubject = allBookData['topicData']['title'];
      
      // // console.log('Received ALL BOOK DATA :', allBookData);
      // this.isActiveItem(firstChapter);
      this.isActiveItem(firstChapter);
      this.breadcrumbs.push(this.currentSubject);
      this.breadcrumbs.push(this.bookChapters[0].chaptertitle);
      this.selectChapter(this.bookChapters[0])
    }
  
    if(this.userId != null){
      this.booksArray = await this.syllabusService.getUserBooks(this.userId)
    }
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
    chaptertitle: data.chaptertitle,
    isChapterCompleted: data.ischaptercompleted
  }));

  return {topicData, chaptersData, userData}

  }
  renderingHtmlRes(htmlRes: string) {
    this.safeHtml = '';
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(htmlRes);
    // // console.log(this.safeHtml);
    return this.safeHtml;
  }

  onClickLogout(): void {
    this.sharedService.logout();
  }

  validateInput(event: any) {
    const value = event.target.value;
    // Allow alphanumeric characters and at most 2 special characters
    const isValid = /^[A-Za-z0-9]*[^A-Za-z0-9]{0,2}$/.test(value);
  
    if (!isValid) {
      // If input is invalid, remove the last character
      event.target.value = value.slice(0, -1);
      this.userQuery = event.target.value;
    } else {
      this.userQuery = value;
    }
  }
  

  async userQueryHandler(){
    this.isUserInput=true;
  
    /*
    interface ChapterConfig {
    bookTopic: string,
    bookChapter: string,
    bookLanguage: string,
    chapterId:number
}
interface ChapterConversationConfig{
    chapterDetails: ChapterConfig
    content: {
        gpt: string,
        user?: string
    }[]
}

    */


if(this.userQuery.trim().length>1){
  let chapterConversationByUser: {gpt: string, user: string}[] = []
  let chapterConfig = {
    bookTopic: this.currentSubject,
    bookChapter: this.activeItem,
    bookLanguage: 'English',
    chapterId: this.activeChapterId
  }
  
  let userQueryHtml = `<p>${this.userQuery.trim()}</p>`
  this.chapterConversation[this.chapterConversation.length-1].user = this.renderingHtmlRes(userQueryHtml);
  
  this.chapterConversation.forEach(data => {
    let gptData = data.gpt as { changingThisBreaksApplicationSecurity: string };
    let userData = data.user as {changingThisBreaksApplicationSecurity: string};
    chapterConversationByUser.push({
      gpt : gptData['changingThisBreaksApplicationSecurity'],
      user: userData['changingThisBreaksApplicationSecurity']

    })
  });
  this.scrolledToBottom = false;
  let finalObject = {
    chapterDetails: chapterConfig,
    content: chapterConversationByUser
  }
  // console.log(chapterConfig)

  this.userQuery = '';
  let result = await this.syllabusService.handleUserInput(finalObject);
  // console.log(result)
  this.chapterConversation.push({gpt: this.renderingHtmlRes(result.msg.gpt)});
  this.scrolledToBottom = false;
  this.isUserInput=false;
  localStorage.setItem(`${this.activeChapterId}`, JSON.stringify(this.chapterConversation))
}

  }
  
  downloadPdf() {
    this.showToast();
    this.isDownloading = true;
    // console.log("Download PDF clicked");
    // console.log("isDownloading :", this.isDownloading);
    let payload = {
      userId: this.userId,
      bookId: this.bookId
    }
   try {
    this.pdfService.downloadPdf(payload).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.breadcrumbs[0]; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      this.isDownloading = false;
    },(error)=> this.isDownloading = false);
   } catch (error) {
    this.isDownloading = false;
   }
  }

  async markBookAsCompleted(item:ChapterConfig, $event: any){
   
    $event.stopPropagation();
    item.isChapterCompleted = ($event.target as HTMLInputElement).checked;
    this.syllabusService.setChapterCompletionStatus(item)
  }
}
