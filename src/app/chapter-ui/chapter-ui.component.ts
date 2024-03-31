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
