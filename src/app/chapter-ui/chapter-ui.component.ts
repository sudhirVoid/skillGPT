import { Component,OnInit } from '@angular/core';
import { SyllabusService } from '../gpt-service.service';
SyllabusService
@Component({
  selector: 'app-chapter-ui',
  templateUrl: './chapter-ui.component.html',
  styleUrls: ['./chapter-ui.component.css']
})
export class ChapterUiComponent  implements OnInit{


  textToType: string = "Hello, I am ChatGPT!";
  typedText: string = "";
  bookChapters: string[] = []
  constructor(private syllabusService: SyllabusService) { }

  generateSyllabus() {
    this.syllabusService.generateSyllabus('C++', 'English').subscribe(
      response => {
        // Handle the response from the API here
        console.log(response);
        this.bookChapters = response.msg
        console.log(this.bookChapters);
      },
      error => {
        // Handle errors here
        console.error('Error:', error);
      }
    );
  }
  ngOnInit(): void {
    this.generateSyllabus();
  }

  
}
