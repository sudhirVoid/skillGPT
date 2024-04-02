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
  isGenerating: boolean = false;
  suggestedTopics: string[] = [
    "Computer Science",
    "Data Analysis",
    "Artificial Intelligence",
    "Robotics",
    "Cybersecurity",
    "Web Development",
    "Mobile App Development",
    "Cloud Computing",
    "Data Science",
    "Machine Learning",
    "Software Engineering",
    "Game Development",
    
    "Human Resources Management",
    "Leadership Development",
    "Communication Skills",
    "Conflict Resolution",
    "Emotional Intelligence",
    "Time Management",
    "Stress Management",
    "Personal Finance",
    "Investment Strategies",
    "Entrepreneurship",
    "Startups",
    "Innovation Management",
    "Environmental Sustainability",
    "Renewable Energy",
    "Climate Change Mitigation",
    "Sustainable Development",
    "Green Technologies",
    "Urban Planning",
    "Public Policy Analysis",
    "International Relations",
    "Diplomacy",
    "Globalization",
    "Cultural Studies",
    "Anthropology",
    "Archaeology",
    "Linguistics",
    "Literature Studies",
    "Philosophy",
    "Ethics",
    "Religion Studies",
    "Psychology",
    "Sociology",
    "History",
    "Political Science",
    "Economics",
    "Geography",
    "Geology",
    "Astronomy",
    "Biology",
    "Chemistry",
    "Physics",
    "Mathematics",
    "Statistics",
    "Algebra",
    "Calculus",
    "Geometry",
    "Trigonometry",
    "Number Theory",
    "Differential Equations",
    "Probability Theory",
    "Game Theory",
    "Cryptography",
    "Graph Theory",
    "Topology",
    "Linear Algebra",
    "Quantum Mechanics",
    "Astrophysics",
    "Particle Physics",
    
   
  ];
  
  constructor(private syllabusService: SyllabusService, private router: Router, private dataTransferService:DataTransferService) { }

  postInputTopic(topic:any){
    this.isGenerating = true;
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

  setSuggestedTopics(event: any) {
    this.topic = event.target.innerText;
    this.postInputTopic(this.topic)
    
  }

}


