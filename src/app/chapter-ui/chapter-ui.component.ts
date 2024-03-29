import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-chapter-ui',
  templateUrl: './chapter-ui.component.html',
  styleUrls: ['./chapter-ui.component.css']
})
export class ChapterUiComponent  implements OnInit{
  textToType: string = "Hello, I am ChatGPT!";
  typedText: string = "";
  constructor() { }
  ngOnInit(): void {
  }

  
}
