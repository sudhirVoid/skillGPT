import { Component,OnInit } from '@angular/core';
import { SyllabusService } from '../gpt-service.service';
import { ActivatedRoute } from '@angular/router';
import { DataTransferService } from '../data-transfer.service';

import { DomSanitizer,SafeHtml } from "@angular/platform-browser";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

interface BookConfig{
  book_id: string, title: string
}
export interface ChapterConfig{
  chapterid: number,
  chaptertitle: string
}
@Component({
  selector: 'app-chapter-ui',
  templateUrl: './chapter-ui.component.html',
  styleUrls: ['./chapter-ui.component.css']
})
export class ChapterUiComponent {


  textToType: string = "Hello, I am ChatGPT!";
  typedText: string = "";
  safeHtml:SafeHtml="";
  breadcrumbs: string[] = [];
  isChapterMode: boolean = false;
  booksArray: BookConfig[] = [];
  chapters: { subject: string, chapter: string }[] = [];
  selectedSubject: string = "";
  filteredChapters: string[] = [];
  currentSubject: string | null = null;
  isCurrentSubject:boolean=false;
  currentSubjects: string[] = [];
  activeItem: string | null = null;
  //we have whole conversation of a chapter between user and gpt here.
  chapterConversation: {
    gpt: SafeHtml;
    user?: string;
  }[] = []; 

  isActiveItem(item: string): boolean {

    return this.activeItem === item;
    
  }

  
  selectBook(subject: BookConfig): void {
    // this.activeItem = subject;
    // console.log("active item: ",this.activeItem)
    
    this.breadcrumbs.push(subject.title);
    this.isCurrentSubject=true;
    this.currentSubject = subject.title;
    // this.selectedSubject = subject;
    // this.filteredChapters = this.chapters.filter(chapter => chapter.subject === subject)
      // .map(chapter => chapter.chapter);
  }
  addNewTopic(): void {
    this.isChapterMode =! this.isChapterMode;
    this.isCurrentSubject=!this.isCurrentSubject;
    this.breadcrumbs=[]
  }

  redirectTo(route: string): void {
    this.router.navigate([route]);
  }
  
  selectChapter(chapter: ChapterConfig): void {
    this.safeHtml = "";
    console.log(chapter)
    this.activeItem = chapter.chaptertitle;
    console.log("active item: ",this.activeItem)
    // this.isActiveItem(chapter);
   
    
    if (!this.breadcrumbs.includes(chapter.chaptertitle)) {
      // If the chapter doesn't exist, pop the last chapter (if exists) and push the new chapter
      if (this.breadcrumbs.length >= 2) {
        this.breadcrumbs.pop();
      }
      this.breadcrumbs.push(chapter.chaptertitle);
    }
    this.syllabusService.getChapterContents(this.selectedSubject,chapter,'English').subscribe(
      response => {
        // Handle the response from the API here
        this.chapterConversation = (response.msg[0].content_text)
        console.log(response);
        // this.safeHtml = response.msg;
        this.renderingHtmlRes(response.msg[0].content_text)
        
        
        
      }
    )
    
    
    
  }
  
  htmlCode: string=`<h1>Variables</h1>
  <p>In programming, variables are used to store and represent data in memory. They act as containers that hold a value, which can be changed and manipulated throughout the program&#39;s execution. Variables are essential in programming as they provide flexibility and allow us to work with different types of data.</p>
  <h2>Declaring and Assigning Variables</h2>
  <p>To declare a variable in JavaScript, we use the <code>var</code>, <code>let</code>, or <code>const</code> keyword followed by the variable name. It is important to note that JavaScript is a dynamically typed language, meaning that the type of a variable is determined at runtime based on the assigned value.</p>
  <h3>Example:</h3>
  <pre><code class="language-javascript">// Using var (ES5)
  var firstName = &quot;John&quot;;
   
  // Using let (ES6)
  let age = 30;
   
  // Using const (ES6)
  const PI = 3.14;
  </code></pre>
  <p>In the above example, we declared variables <code>firstName</code>, <code>age</code>, and <code>PI</code> using <code>var</code>, <code>let</code>, and <code>const</code>, respectively, to store a string, a number, and a constant value.</p>
  <h2>Variable Scope</h2>
  <p>Variables in JavaScript have function scope when declared using <code>var</code>, meaning they are only accessible within the function in which they are defined. When declared using <code>let</code> or <code>const</code>, variables have block scope, meaning they are limited to the block in which they are defined.</p>
  <h3>Example:</h3>
  <pre><code class="language-javascript">function sayHello() {
      var message = &quot;Hello!&quot;;
      console.log(message);
  }
   
  sayHello(); // Output: Hello!
  console.log(message); // Throws an error
  </code></pre>
  <p>In this example, the <code>message</code> variable is localized within the <code>sayHello</code> function because it was declared using <code>var</code>. Accessing it outside the function will result in an error.</p>
  <h2>Variable Naming</h2>
  <p>When naming variables in JavaScript, the following rules apply:</p>
  <ul>
  <li>Variable names are case-sensitive.</li>
  <li>The first character must be a letter, underscore (_) or dollar sign ($).</li>
  <li>Subsequent characters can be letters, digits, underscores, or dollar signs.</li>
  <li>Variable names should be descriptive and meaningful.</li>
  </ul>
  <h3>Example:</h3>
  <pre><code class="language-javascript">let myNumber = 10;
  let user_name = &quot;Alice&quot;;
  const MAX_SIZE = 100;
  </code></pre>
  <p>In the examples above, we have used camelCase for <code>myNumber</code>, snake_case for <code>user_name</code>, and SCREAMING_SNAKE_CASE for <code>MAX_SIZE</code> as variable names.</p>
  <p>Variables are fundamental building blocks in programming, allowing us to store and manipulate data efficiently. Understanding how to declare, assign, and scope variables is crucial for becoming proficient in JavaScript programming.</p>`;
  

 
 
  bookChapters: ChapterConfig[] = []
  constructor(private syllabusService: SyllabusService, private route:ActivatedRoute, private dataTransferService: DataTransferService,private sanitizer: DomSanitizer,private http: HttpClient,private router: Router,private authService: AuthServiceService) { }


  async ngOnInit(): Promise<void> {
    let firstChapter=""
    let bookName=""

    let res = this.authService.isAuthenticated();
    console.log("isLoggedIn : ",res);
    // Retrieve the data using the service
    this.dataTransferService.getChaptersData().subscribe(chapters => {
      if (!chapters.chaptersData[0] ) {
        console.log("no Topic present");
        this.router.navigate(["landingPage"]);
        // this.loginUser.sessionTimeOut();
      }
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
      this.activeItem = firstChapter;
      this.currentSubject = chapters["topicData"]["title"];
      this.booksArray.push(chapters.topicData)
      console.log('Received chapters:',chapters);
      // this.isActiveItem(firstChapter);

      
      this.isCurrentSubject = true;
    });
    this.syllabusService.getChapterContents(bookName,this.bookChapters[0],'English').subscribe(
      response => {
        // Handle the response from the API here
        console.log(response);
response.msg[0].content_text.map((singleChat:{gpt:string, user?:string})=>{
          return this.chapterConversation.push({
            gpt:this.renderingHtmlRes(singleChat?.gpt),
            user:singleChat?.user ?? ''
          })
        })
        
        console.log(this.chapterConversation)

        // this.safeHtml = response.msg;
        // this.renderingHtmlRes(response.msg)
        
        
        
      }
    )



   
  }

  renderingHtmlRes(htmlRes:string) {
    this.safeHtml = "";
        this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(
          htmlRes
        );
        console.log(this.safeHtml)
      return this.safeHtml
  }
  
}
