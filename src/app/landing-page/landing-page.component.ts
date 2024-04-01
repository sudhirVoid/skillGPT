import { Component } from '@angular/core';
import { SyllabusService } from '../gpt-service.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router'; 
import { DataTransferService } from '../data-transfer.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  topic: string = '';
  results:any;
  bookChapters: any;
  constructor(private syllabusService: SyllabusService, private router: Router, private dataTransferService:DataTransferService) { }

  postInputTopic(topic:any){
    console.log(topic)
    this.syllabusService.generateSyllabus(topic, 'English').subscribe(
      response => {
        // Handle the response from the API here
        console.log(response);
        this.bookChapters = response;
        console.log(this.bookChapters);
        
        // Set the data using the service
        this.dataTransferService.setChaptersData(this.bookChapters);

        this.router.navigate(['/results']);
      },
      error => {
        // Handle errors here
        console.error('Error:', error);
      }
    );
  }

}


