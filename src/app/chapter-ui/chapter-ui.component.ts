import { Component,OnInit } from '@angular/core';
import { DomSanitizer,SafeHtml } from "@angular/platform-browser";

@Component({
  selector: 'app-chapter-ui',
  templateUrl: './chapter-ui.component.html',
  styleUrls: ['./chapter-ui.component.css']
})
export class ChapterUiComponent  implements OnInit{
  textToType: string = "Hello, I am ChatGPT!";
  typedText: string = "";
  safeHtml:SafeHtml="";
  breadcrumbs: string[] = ['Home', 'Topics', 'Physics', 'Electricity'];
  
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
  

  itemsArray = new Array(20);
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    this.renderingHtmlRes()
    
   
  }

  renderingHtmlRes() {
    this.safeHtml = "";
        this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(
          this.htmlCode
        );
  }

  
}
