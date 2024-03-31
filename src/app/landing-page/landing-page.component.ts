import { Component } from '@angular/core';
import { SyllabusService } from '../gpt-service.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  topic: string = '';
  results:any;
  bookChapters: any;
  constructor(private syllabusService: SyllabusService, private router: Router) { }

  postInputTopic(topic:any){
    console.log(topic)
    this.syllabusService.generateSyllabus(topic, 'English').subscribe(
      response => {
        // Handle the response from the API here
        console.log(response);
        this.bookChapters = response.msg
        console.log(this.bookChapters);

        this.router.navigate(['/results'], { 
          queryParams: { chapters: JSON.stringify(this.bookChapters) } 
        });
      },
      error => {
        // Handle errors here
        console.error('Error:', error);
      }
    );
  }

}


