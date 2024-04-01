import { Component,OnInit } from '@angular/core';
import { SyllabusService } from '../gpt-service.service';
import { ActivatedRoute } from '@angular/router';
import { DataTransferService } from '../data-transfer.service';

SyllabusService
@Component({
  selector: 'app-chapter-ui',
  templateUrl: './chapter-ui.component.html',
  styleUrls: ['./chapter-ui.component.css']
})
export class ChapterUiComponent {


  textToType: string = "Hello, I am ChatGPT!";
  typedText: string = "";
  bookChapters: string[] = []
  constructor(private syllabusService: SyllabusService, private route:ActivatedRoute, private dataTransferService: DataTransferService) { }


  ngOnInit(): void {

    // Retrieve the data using the service
    this.dataTransferService.getChaptersData().subscribe(chapters => {
      this.bookChapters = chapters;
      console.log('Received chapters:', this.bookChapters);
    });
  }
  

  
}
