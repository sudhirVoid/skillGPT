import { Component,OnInit } from '@angular/core';
import { SyllabusService } from '../gpt-service.service';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private syllabusService: SyllabusService, private route:ActivatedRoute) { }

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
    // Retrieve the query parameters
    this.route.queryParams.subscribe(params => {
      // Check if the 'chapters' query parameter exists
      if (params['chapters']) {
        // Parse the JSON string to get the data
        this.bookChapters= JSON.parse(params['chapters']);
        console.log('Chapters:', this.bookChapters);
        // Now you can use the chapters data as needed in your component
      }
    });
  }
  

  
}
