import { Component } from '@angular/core';
import { SyllabusService } from '../gpt-service.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router'; 
import { DataTransferService } from '../data-transfer.service';
import { AuthServiceService } from '../auth-service.service';
import { getAuth, signOut } from "firebase/auth";
import { SharedService } from '../shared.service';
import { jsPDF } from 'jspdf';
import { FirebaseRealtimeDBService } from '../services/firebase-realtime-db.service';


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
    "Virtual Reality",
    "Augmented Reality",
    "Internet of Things (IoT)",
    "Blockchain Technology",
    "Cryptocurrency",
    "Big Data Analytics",
    "Digital Marketing",
    "E-commerce",
    "User Interface (UI) Design",
    "Content Writing",
    "Copywriting",
    "Social Media Marketing",
    "Search Engine Optimization",
    "Data Visualization",
    "Network Administration",
    "Database Management",
    "System Administration",
    "DevOps Engineering"
  ];
  
  
  constructor(private syllabusService: SyllabusService, private router: Router, private dataTransferService:DataTransferService, private authService : AuthServiceService, private sharedService: SharedService, private firebaseDB: FirebaseRealtimeDBService) { }


  ngOnInit(): void {
    this.suggestedTopics.sort( ()=>Math.random()-0.5 );
    let res = this.authService.isAuthenticated();
    console.log("isLoggedIn : ",res);
    
  }

  onClickLogout(): void{
    this.sharedService.logout();
  }


   postInputTopic(topic:any){
    this.isGenerating = true;
    console.log(topic)
    this.syllabusService.generateSyllabus(topic, 'English').subscribe(
      async response => {
        // Handle the response from the API here
        console.log(response);
        this.bookChapters = response;
        console.log(this.bookChapters);
        //Decrease Credit as one book is already generated.
        await this.firebaseDB.decreaseCredit();
        // Set the data using the service
        this.dataTransferService.setChaptersData(this.bookChapters);
        console.log(this.bookChapters);
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

  downloadPdf() {
    let doc = new jsPDF();
    let html = `
<style>
  h1 { font-size: 24px; font-weight: bold; }
  h2 { font-size: 18px; font-weight: bold; }
  p { font-size: 14px; line-height: 1.5; }
</style>
<h1>Introduction to Data Analysis</h1>
<p>Data analysis is the process of analyzing, cleaning, transforming, and modeling data to discover useful information, draw conclusions, and support decision-making. It is an essential part of understanding trends, making predictions, and gaining insights from various data sources. In today's data-driven world, data analysis plays a crucial role in almost every industry, from business and finance to healthcare and research.</p>
<h2>Importance of Data Analysis</h2>
<p>Data analysis helps in:</p>
`;
    doc.html(html, {
     callback: function (doc) {
       doc.save('test.pdf');
     },
     x: 2,
     y: 2,
     width: 1000
     
  });
 }
}
